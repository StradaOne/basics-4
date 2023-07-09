import Cookies from "js-cookie";
import { VARIABLES, MESSAGE } from "./variables.js";
import { getCurrentTime, scrollToEnd } from "./utils.js";
import { getMessageHistory } from "./api.js";

// * функция добавления стиля расположения сообщения

export function addClassToMessage(sender) {
	if (sender === "I") {
		MESSAGE.CONTAINER.classList.add("chat-message_user");
	} else {
		MESSAGE.CONTAINER.classList.remove("chat-message_user");
		MESSAGE.CONTAINER.classList.add("chat-message_companion");
	}
}

// * функция создания сообщения

export function createMessage({ userName, text, time, email }) {
	const sender = email === Cookies.get("email") ? "I" : "COMPANION";
	MESSAGE.SENDER.textContent = userName;
	MESSAGE.TEXT.textContent = text;
	MESSAGE.TIME.textContent = getCurrentTime(time);
	addClassToMessage(sender);
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
			time: createdAt,
			email: user.email,
		});
	});
	VARIABLES.CHAT_SCREEN.append(...messages);
	scrollToEnd();
}
