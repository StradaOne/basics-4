import Cookies from "js-cookie";
import { VARIABLES, MESSAGE, MODAL } from "./variables.js";
import { getCurrentDate, clearInput, isMessageEmpty, modalChange } from "./utils.js";
import { receiveCodeByEmail, getUserDataRequest, changeUserName } from "./api.js";

// * функция добавления сообщения

function addMessage(message) {
	VARIABLES.CHAT_SCREEN.append(message);
	clearInput(VARIABLES.MESSAGE_FORM);
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
		modalChange(MODAL.AUTHORIZATION.DIALOG, MODAL.VERIFICATION.DIALOG);
	} catch (err) {
		console.log(err.message);
	}
}

async function handleVerificationForm(event) {
	try {
		event.preventDefault();
		const token = MODAL.VERIFICATION.CODE.value;
		const response = await getUserDataRequest(token);
		if (response) {
			Cookies.set("token", token, { expires: 3 });
			MODAL.VERIFICATION.DIALOG.close();
		} else {
			console.log("Ошибка верификации");
		}
		clearInput(MODAL.VERIFICATION.FORM);
	} catch (err) {
		console.log(err.message);
	}
}

async function handleSettinsForm(event) {
	try {
		event.preventDefault();
		const name = MODAL.SETTINGS.NAME.value;
		const result = await changeUserName(name);
		if (result) {
			Cookies.set("name", name);
			console.log("Имя успешно сохранено");
			MODAL.SETTINGS.DIALOG.close();
		}
	} catch (err) {
		console.log(err.message);
	}
}

document.addEventListener("DOMContentLoaded", authorization);

MODAL.AUTHORIZATION.FORM.addEventListener("submit", handleAuthenticationForm);
MODAL.VERIFICATION.FORM.addEventListener("submit", handleVerificationForm);
MODAL.SETTINGS.FORM.addEventListener("submit", handleSettinsForm);

VARIABLES.SETTINGS_BTN.addEventListener("click", () => {
	MODAL.SETTINGS.DIALOG.showModal();
	MODAL.SETTINGS.NAME.value = Cookies.get("name");
});

MODAL.SETTINGS.BTN_CLOSE.addEventListener("click", () => {
	MODAL.SETTINGS.DIALOG.close();
});
