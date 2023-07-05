import Cookies from "js-cookie";
import { getMessages } from "./api";
import { addBetterTVEmoji } from "./betterTV";
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

const { INPUT_MESSAGE, SEND_BUTTON, TEMPLATE, WINDOW, APP, BODY, CHAT_WINDOW, COUNTER } =
	DOM_ELEMENTS.CHAT;
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
	const messagesPromises = reversedMessagesData.map((element) => {
		const { user, text, createdAt } = element;
		return createMessage({
			text,
			email: user.email,
			nickname: user.name,
			time: timeConvert(createdAt),
		});
	});
	const messages = await Promise.all(messagesPromises);
	WINDOW.append(...messages);
	WINDOW.scrollIntoView(false);
}

let socket = null;
let unreadMessage = 0;

export function scrollToEnd() {
	WINDOW.scrollIntoView({ behavior: "smooth", block: "end" });
	unreadMessage = 0;
	console.log(unreadMessage);
	COUNTER.textContent = unreadMessage;
	hideElement(COUNTER);
}

export function connectWebSocket(token) {
	if (socket) {
		socket.close();
	}
	// eslint-disable-next-line no-undef
	socket = new WebSocket(`wss://edu.strada.one/websockets?${token}`);

	socket.addEventListener("message", async (event) => {
		const data = JSON.parse(event.data);
		const {
			text,
			user: { email, name },
			updatedAt,
		} = data;

		const message = await createMessage({
			text,
			email,
			nickname: name,
			time: timeConvert(updatedAt),
		});

		const isScrollNearBottom =
			CHAT_WINDOW.scrollHeight - (CHAT_WINDOW.scrollTop + CHAT_WINDOW.clientHeight) <= 200;

		if (isScrollNearBottom || email === Cookies.get(EMAIL)) {
			WINDOW.append(message);
			scrollToEnd();
			unreadMessage = 0;
			hideElement(COUNTER);
		} else {
			unreadMessage += 1;
			COUNTER.textContent = unreadMessage;
			showElement(COUNTER);
			console.log(unreadMessage);
			WINDOW.append(message);
		}
	});

	socket.addEventListener("close", () => {
		console.log("WebSocket is closed");
		setTimeout(connectWebSocket(Cookies.get(TOKEN)), 1000);
	});

	socket.addEventListener("error", () => {
		console.error("WebSocket error:");
	});
}

export function sendWebSoket(text) {
	socket.send(JSON.stringify({ text: text }));
}

export function closeWebSoket() {
	socket.close();
}

export function initializeUI() {
	const token = Cookies.get(TOKEN);
	if (token) {
		connectWebSocket(token);
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
