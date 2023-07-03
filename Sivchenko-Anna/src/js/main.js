import { VARIABLES, MESSAGE, MODAL } from "./variables.js";
import { getCurrentDate, clearInput, isMessageEmpty } from "./utils.js";
import { receiveCodeByEmail } from "./api.js";

// * функция добавления сообщения

function addMessage(message) {
	VARIABLES.CHAT_SCREEN.append(message);
	clearInput(VARIABLES.MESSAGE_FORM);
	// clearInput();
}

// * функция добавления стиля расположения сообщения

function addClassToMessage(user) {
	if (user === VARIABLES.USER.I) {
		MESSAGE.CONTAINER.classList.add("chat-message_user");
	} else {
		MESSAGE.CONTAINER.classList.add("chat-message_companion");
	}
}

// * функция создания сообщения

function createMessage() {
	MESSAGE.SENDER.textContent = VARIABLES.USER.I;
	addClassToMessage(MESSAGE.SENDER.textContent);
	const messageText = MESSAGE.INPUT.value;
	if (isMessageEmpty(messageText)) {
		alert("Пожалуйста введите сообщение");
		return;
	}
	MESSAGE.TEXT.textContent = messageText;
	MESSAGE.TIME.textContent = getCurrentDate();
	const message = VARIABLES.MESSAGE_TEMPLATE.content.cloneNode(true);
	addMessage(message);
}

VARIABLES.MESSAGE_FORM.addEventListener("submit", function (e) {
	e.preventDefault();
	createMessage();
});

function authorization() {
	MODAL.AUTHORIZATION.DIALOG.showModal();
}

async function handleAuthenticationForm(event) {
	try {
		event.preventDefault();
		const email = MODAL.AUTHORIZATION.EMAIL.value;
		await receiveCodeByEmail(email);
		clearInput(MODAL.AUTHORIZATION.FORM);
	} catch (err) {
		console.log(err.message);
	}
}

document.addEventListener("DOMContentLoaded", authorization);

MODAL.AUTHORIZATION.FORM.addEventListener("submit", handleAuthenticationForm);
