import Cookies from "js-cookie";
import { getMessages } from "./api";
import {
	DOM_ELEMENTS,
	PROPERTIES,
	SELECTORS,
	TOKEN,
	THEME,
	DEFAULT_THEME,
	EMAIL,
} from "./constants";
import { loadFromLocalStorage } from "./localStorage";
import { MEMBERS, DEFAULT_ICON } from "./members";
import { showElement, hideElement, timeConvert } from "./utils";
import { isEmpty } from "./validation";

const { INPUT_MESSAGE, SEND_BUTTON, TEMPLATE, WINDOW, APP, BODY } = DOM_ELEMENTS.CHAT;
const { MODAL_AUTH } = DOM_ELEMENTS.AUTHORIZATION;
const { THEME_SETTINGS } = DOM_ELEMENTS.SETTINGS;
const {
	MESSAGE_SELECTOR,
	TEXT_SELECTOR,
	TIME_SELECTOR,
	CONTENT_SELECTOR,
	AVATAR_SELECTOR,
	NICKNAME_SELECTOR,
} = SELECTORS.CHAT;

export function hideSendButton() {
	return !isEmpty(INPUT_MESSAGE.value) ? showElement(SEND_BUTTON) : hideElement(SEND_BUTTON);
}

export function changeIcon(email) {
	for (let i = 0; i < MEMBERS.length; i += 1) {
		if (MEMBERS[i].email === email) {
			return MEMBERS[i].icon;
		}
	}
	return DEFAULT_ICON;
}

export function createMessage({ text, email, nickname, time }) {
	const type = email === Cookies.get(EMAIL) ? PROPERTIES.RIGHT_SIDE : PROPERTIES.LEFT_SIDE;

	const item = TEMPLATE.content.cloneNode(true);
	const message = item.querySelector(MESSAGE_SELECTOR);
	const textElem = message.querySelector(TEXT_SELECTOR);
	const timeElem = message.querySelector(TIME_SELECTOR);
	const contentElem = message.querySelector(CONTENT_SELECTOR);
	const avatarElem = message.querySelector(AVATAR_SELECTOR);
	const nicknameElem = message.querySelector(NICKNAME_SELECTOR);

	textElem.textContent = text;
	timeElem.textContent = time;
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
	const messages = reversedMessagesData.map((element) => {
		const { user, text, createdAt } = element;
		return createMessage({
			text,
			email: user.email,
			nickname: user.name,
			time: timeConvert(createdAt),
		});
	});
	WINDOW.append(...messages);
	WINDOW.scrollIntoView(false);
}

export function initializeUI() {
	if (Cookies.get(TOKEN)) {
		showElement(APP);
		renderMessages();
		MODAL_AUTH.close();
	} else {
		MODAL_AUTH.showModal();
	}
	const theme = loadFromLocalStorage(THEME) || DEFAULT_THEME;
	BODY.className = theme;
	THEME_SETTINGS.value = theme;
}
