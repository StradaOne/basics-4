import Cookies from "js-cookie";
import { VARIABLES, MODAL, MESSAGE } from "./variables.js";
import {
	clearInput,
	modalChange,
	isMessageEmpty,
	getCurrentTime,
	isEmailValid,
	scrollToEnd,
} from "./utils.js";
import { receiveCodeByEmail, getUserDataRequest, changeUserName } from "./api.js";
import { createMessage, addMessage, renderMessages } from "./message.js";

async function handleAuthenticationForm(event) {
	try {
		event.preventDefault();
		const email = MODAL.AUTHORIZATION.EMAIL.value;
		if (isEmailValid(email)) {
			await receiveCodeByEmail(email);
			MODAL.AUTHORIZATION.EMAIL.classList.toggle("valid-email");
			MODAL.AUTHORIZATION.BTN_ENTER.removeAttribute("disabled");
			MODAL.AUTHORIZATION.BTN_GET.setAttribute("disabled", true);
		} else {
			MODAL.AUTHORIZATION.EMAIL.classList.add("invalid-email");
			console.log("Неверный email");
		}
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
			Cookies.set("email", response.email);
			Cookies.set("name", response.name);
			renderMessages();
			MODAL.VERIFICATION.DIALOG.close();
			MODAL.AUTHORIZATION.SING_IN.textContent = "Выйти";
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

async function handleSendMessageForm(event) {
	event.preventDefault();
	const messageText = MESSAGE.INPUT.value;
	if (!isMessageEmpty(messageText)) {
		const message = createMessage({
			userName: Cookies.get("name"),
			text: messageText,
			time: getCurrentTime(new Date()),
			email: Cookies.get("email"),
		});
		addMessage(message);
		scrollToEnd();
	} else {
		console.log("Введите сообщение");
	}
}

MODAL.AUTHORIZATION.FORM.addEventListener("submit", handleAuthenticationForm);
MODAL.VERIFICATION.FORM.addEventListener("submit", handleVerificationForm);
MODAL.SETTINGS.FORM.addEventListener("submit", handleSettinsForm);
VARIABLES.MESSAGE_FORM.addEventListener("submit", handleSendMessageForm);

MODAL.AUTHORIZATION.BTN_ENTER.addEventListener("click", () =>
	modalChange(MODAL.AUTHORIZATION.DIALOG, MODAL.VERIFICATION.DIALOG),
);

VARIABLES.SETTINGS_BTN.addEventListener("click", () => {
	MODAL.SETTINGS.DIALOG.showModal();
	MODAL.SETTINGS.NAME.value = Cookies.get("name");
});

MODAL.SETTINGS.BTN_CLOSE.addEventListener("click", () => {
	MODAL.SETTINGS.DIALOG.close();
});

function authorization() {
	MODAL.AUTHORIZATION.DIALOG.showModal();
}

document.addEventListener("DOMContentLoaded", authorization);
