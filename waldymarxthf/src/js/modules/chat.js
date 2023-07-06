import Cookies from "js-cookie";
import { SELECTORS, PROPERTIES, DOM_ELEMENTS, EMAIL } from "./constants";
import { showElement, timeConvert } from "./utils";
import { addBetterTVEmoji } from "./betterTV";
import { getMessages } from "./api";
import { DEFAULT_ICON, MEMBERS } from "./members";

const {
	MESSAGE_SELECTOR,
	TEXT_SELECTOR,
	TIME_SELECTOR,
	CONTENT_SELECTOR,
	AVATAR_SELECTOR,
	NICKNAME_SELECTOR,
} = SELECTORS.CHAT;
const { WINDOW, TEMPLATE } = DOM_ELEMENTS.CHAT;

function changeIcon(email) {
	const member = MEMBERS.find((user) => user.email === email);
	return member ? member.icon : DEFAULT_ICON;
}

export async function createMessage({ text, email, nickname, time }) {
	const type = email === Cookies.get(EMAIL) ? PROPERTIES.RIGHT_SIDE : PROPERTIES.LEFT_SIDE;

	const item = TEMPLATE.content.cloneNode(true);
	const message = item.querySelector(MESSAGE_SELECTOR);
	const textElem = message.querySelector(TEXT_SELECTOR);
	const timeElem = message.querySelector(TIME_SELECTOR);
	const contentElem = message.querySelector(CONTENT_SELECTOR);
	const avatarElem = message.querySelector(AVATAR_SELECTOR);
	const nicknameElem = message.querySelector(NICKNAME_SELECTOR);

	textElem.append(await addBetterTVEmoji(text));
	timeElem.textContent = timeConvert(time);
	message.classList.add(`message-${type}`);
	contentElem.classList.add(`content-${type}`);

	if (type === PROPERTIES.LEFT_SIDE) {
		avatarElem.src = changeIcon(email);
		showElement(avatarElem.parentElement);

		nicknameElem.textContent = nickname;
		showElement(nicknameElem);
	}
	return message;
}

export async function renderMessages() {
	const messagesData = await getMessages();
	const reversedMessagesData = messagesData.messages.reverse();
	const messagesPromises = reversedMessagesData.map((element) => {
		const {
			user: { email, name },
			text,
			createdAt,
		} = element;
		return createMessage({
			text,
			email: email,
			nickname: name,
			time: createdAt,
		});
	});
	const messages = await Promise.all(messagesPromises);
	WINDOW.append(...messages);
	WINDOW.scrollIntoView(false);
}
