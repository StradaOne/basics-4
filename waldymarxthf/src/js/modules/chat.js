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
const { WINDOW, TEMPLATE, CHAT_WINDOW } = DOM_ELEMENTS.CHAT;

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

	const betterTVEmojiText = await addBetterTVEmoji(text);
	textElem.append(betterTVEmojiText);
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

let loadedMessages = [];
let currentMessage = 0;
const nextMessages = 20;

async function loadMessages() {
	const messagesData = await getMessages();
	loadedMessages = messagesData.messages;
}

export async function renderMessages() {
	const prevScrollHeight = CHAT_WINDOW.scrollHeight;

	await loadMessages();
	const messagesToRender = loadedMessages
		.slice(currentMessage, currentMessage + nextMessages)
		.reverse();

	const messagesPromises = messagesToRender.map((element) => {
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
	WINDOW.prepend(...messages);

	const newScrollHeight = CHAT_WINDOW.scrollHeight;
	CHAT_WINDOW.scrollTop += newScrollHeight - prevScrollHeight;

	currentMessage += nextMessages;
}

CHAT_WINDOW.addEventListener("scroll", () => {
	return CHAT_WINDOW.scrollTop === 0 && renderMessages();
});
