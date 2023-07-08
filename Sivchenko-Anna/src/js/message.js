import Cookies from "js-cookie";
import { VARIABLES, MESSAGE } from "./variables.js";
import { getCurrentTime, clearInput, scrollToEnd } from "./utils.js";
import { getMessageHistory } from "./api.js";

// * функция добавления сообщения

export function addMessage(message) {
	VARIABLES.CHAT_SCREEN.append(message);
	clearInput(VARIABLES.MESSAGE_FORM);
}

// * функция добавления стиля расположения сообщения

export function addClassToMessage(sender) {
	if (sender === "I") {
		MESSAGE.CONTAINER.classList.add("chat-message_user");
	} else {
		MESSAGE.CONTAINER.classList.add("chat-message_companion");
	}
}

// * функция создания сообщения

export function createMessage({ userName, text, time, email }) {
	const sender = email === Cookies.get("email") ? "I" : "COMPANION";
	addClassToMessage(sender);
	MESSAGE.SENDER.textContent = userName;
	MESSAGE.TEXT.textContent = text;
	MESSAGE.TIME.textContent = time;
	const message = VARIABLES.MESSAGE_TEMPLATE.content.cloneNode(true);
	return message;
}

// * функция рендера сообщений

export async function renderMessages() {
	const messagesData = await getMessageHistory();
	const messages = messagesData.messages.reverse().map((element) => {
		const { user, text, createdAt } = element;
		return createMessage({
			userName: user.name,
			text,
			time: getCurrentTime(createdAt),
			email: user.email,
		});
	});
	VARIABLES.CHAT_SCREEN.append(...messages);
	scrollToEnd();
}
