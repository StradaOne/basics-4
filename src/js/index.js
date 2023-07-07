// eslint-disable-next-line import/no-extraneous-dependencies
import Cookies from "js-cookie";
import {
	M_TEMPLATE,
	UI_ELEMNTS,
	tmpl,
	POPUP_SETTINGS,
	POPUP_LOGIN,
	POPUP_CONFIRM,
} from "./ui_elements";
import { clearInput, getTime, validEmpty, ValidationError, setCookie, getCookie } from "./utils";
import { getCode, getUserInfo, changeName, getHistory } from "./fetch";

window.addEventListener("DOMContentLoaded", () => {
	if (getCookie()) {
		UI_ELEMNTS.POPUP_MAIN_MENU.showModal();
	} else {
		POPUP_LOGIN.POPUP_LOGIN_MENU.showModal();
	}
});
// eslint-disable-next-line no-undef
const socket = new WebSocket(`wss://edu.strada.one/websockets?${getCookie()}`);

UI_ELEMNTS.MAIN_SETTINGS_BTN.addEventListener("click", () => {
	POPUP_SETTINGS.SETTINGS_MENU.showModal();
});

POPUP_SETTINGS.SETTINGS_MENU.addEventListener("click", (event) => {
	if (event.target === POPUP_SETTINGS.SETTINGS_MENU) {
		POPUP_SETTINGS.SETTINGS_MENU.close();
	}
});

POPUP_LOGIN.LOGIN_BTN_SET.addEventListener("click", () => {
	POPUP_CONFIRM.POPUP_CONFIRM_MENU.showModal();
});

POPUP_CONFIRM.POPUP_CONFIRM_MENU.addEventListener("click", (event) => {
	if (event.target === POPUP_CONFIRM.POPUP_CONFIRM_MENU) {
		POPUP_CONFIRM.POPUP_CONFIRM_MENU.close();
	}
});

function createMessage(name, email, text) {
	M_TEMPLATE.SENDER.textContent = `${name}:`;
	M_TEMPLATE.TIME.textContent = getTime();

	if (validEmpty(text)) {
		// eslint-disable-next-line no-alert, no-undef
		alert("Please, enter some words)");
		return;
	}
	M_TEMPLATE.TEXT.textContent = text;
	const message = tmpl.content.cloneNode(true);
	const targetElement = message.querySelector(".message-box");
	if (email === "starcenkoboris2@gmail.com") {
		targetElement.classList.add("message-box-I");
	} else {
		targetElement.classList.add("message-box-companion");
	}
	UI_ELEMNTS.SCREEN.append(message);
	targetElement.scrollIntoView(false);
}

function handlerMessage(event) {
	event.preventDefault();
	try {
		socket.send(JSON.stringify({ text: UI_ELEMNTS.INPUT.value }));
		clearInput();
	} catch (err) {
		if (err instanceof ValidationError) {
			console.log(`Error: ${err.message}`);
		} else {
			throw err;
		}
	}
}
UI_ELEMNTS.FORM.addEventListener("submit", handlerMessage);

POPUP_LOGIN.LOGIN_BTN_GET.addEventListener("click", (event) => {
	event.preventDefault();
	if (POPUP_LOGIN.LOGIN_INPUT.value === "") {
		// eslint-disable-next-line no-alert, no-undef
		alert("Please enter your email)");
	}
	getCode();
	POPUP_LOGIN.LOGIN_INPUT.value = "";
});

POPUP_CONFIRM.CONFIRM_FORM.addEventListener("submit", (event) => {
	event.preventDefault();
	if (!getCookie()) {
		UI_ELEMNTS.POPUP_MAIN_MENU.showModal();
		POPUP_CONFIRM.POPUP_CONFIRM_MENU.close();
		getUserInfo();
		setCookie();
	} else UI_ELEMNTS.POPUP_MAIN_MENU.showModal();
	POPUP_CONFIRM.POPUP_CONFIRM_MENU.close();
	getUserInfo();
});

POPUP_SETTINGS.SETTINGS_FORM.addEventListener("submit", (event) => {
	event.preventDefault();
	try {
		changeName();
		getUserInfo();
	} catch (err) {
		if (err instanceof ValidationError) {
			console.log(`Error: ${err.message}`);
		} else {
			throw err;
		}
	}
});

socket.onmessage = async (event) => {
	const data = JSON.parse(event.data);
	createMessage(data.user.name, data.user.email, data.text);
};

let startIndex = 0;
let endIndex = 20;
async function loadNewMessages() {
	const history = await getHistory();
	if (endIndex > 300) {
		endIndex = 300;
	}
	const objects = history.messages.slice(startIndex, endIndex);
	startIndex += 20;
	endIndex += 20;

	// eslint-disable-next-line no-plusplus
	for (let i = 0; i < objects.length; i++) {
		createMessage(objects[i].user.name, objects[i].user.email, objects[i].text);
	}
}

UI_ELEMNTS.SCREEN.addEventListener("scroll", function () {
	if (UI_ELEMNTS.SCREEN.scrollTop === 0) {
		loadNewMessages();
	}
});
