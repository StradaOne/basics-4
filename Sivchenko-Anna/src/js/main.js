import Cookies from "js-cookie";
import { VARIABLES, MODAL, MESSAGE } from "./variables.js";
import { clearInput, modalChange, isValueEmpty, isEmailValid, scrollToEnd } from "./utils.js";
import { receiveCodeByEmail, getUserDataRequest, changeUserName } from "./api.js";
import { renderMessages } from "./message.js";
import { connectToWebSocket, sendWebSoket, closeWebSocket } from "./websocket.js";

async function handleAuthenticationForm(event) {
	try {
		event.preventDefault();
		const email = MODAL.AUTHORIZATION.EMAIL.value;
		if (isEmailValid(email)) {
			await receiveCodeByEmail(email);
			MODAL.AUTHORIZATION.EMAIL.classList.toggle("valid-value");
			MODAL.AUTHORIZATION.BTN_ENTER.removeAttribute("disabled");
			MODAL.AUTHORIZATION.BTN_GET.setAttribute("disabled", true);
		} else {
			MODAL.AUTHORIZATION.EMAIL.classList.add("invalid-value");
			MODAL.AUTHORIZATION.EMAIL.focus();
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
			connectToWebSocket(Cookies.get("token"));
			renderMessages();
			MODAL.VERIFICATION.DIALOG.close();
			VARIABLES.CHAT.classList.remove("hidden");
			scrollToEnd();
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
		if (isValueEmpty(name)) {
			console.log("Введите имя");
			return;
		}
		const result = await changeUserName(name);
		if (result) {
			Cookies.set("name", name);
			closeWebSocket();
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
	if (!isValueEmpty(messageText)) {
		sendWebSoket(messageText);
		clearInput(VARIABLES.MESSAGE_FORM);
		scrollToEnd();
	} else {
		console.log("Введите сообщение");
	}
}

MODAL.AUTHORIZATION.FORM.addEventListener("submit", handleAuthenticationForm);
MODAL.VERIFICATION.FORM.addEventListener("submit", handleVerificationForm);
MODAL.SETTINGS.FORM.addEventListener("submit", handleSettinsForm);
VARIABLES.MESSAGE_FORM.addEventListener("submit", handleSendMessageForm);

MODAL.AUTHORIZATION.BTN_ENTER.addEventListener(
	"click",
	() => modalChange(MODAL.AUTHORIZATION.DIALOG, MODAL.VERIFICATION.DIALOG),
	MODAL.AUTHORIZATION.FORM.reset(),
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
	MODAL.AUTHORIZATION.FORM.reset();
	MODAL.AUTHORIZATION.EMAIL.focus();
}

VARIABLES.EXIT_BTN.addEventListener("click", () => {
	authorization();
	Cookies.remove("token");
	Cookies.remove("name");
	Cookies.remove("email");
	closeWebSocket();
	VARIABLES.CHAT.classList.add("hidden");
});

function initialization() {
	const token = Cookies.get("token");
	if (!token) {
		authorization();
	} else {
		connectToWebSocket(token);
		renderMessages();
	}
}

document.addEventListener("DOMContentLoaded", initialization);
