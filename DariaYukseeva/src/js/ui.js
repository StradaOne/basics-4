import { variables } from "./ui_variables";
import { saveToLocalStorage, loadFromLocalStorage, getTime, isEmpty } from "./utiles";

let theme = loadFromLocalStorage("chatAppTheme") || "light";

export function changeTheme() {
	theme = theme === "light" ? "dark" : "light";
	document.documentElement.setAttribute("data-theme", theme);
	variables.popup.style.display = "none";
	saveToLocalStorage("chatAppTheme", theme);
}

export function setTheme() {
	if (theme === "dark") {
		variables.themeBtn.checked = true;
	}
	document.documentElement.setAttribute("data-theme", theme);
}

function creatMessageNode(text, sender) {
	let messageTemplate = null;
	if (sender === "me") {
		messageTemplate = variables.templateMyMessage.content.cloneNode(true);
		messageTemplate.querySelector(".text").textContent = text;
		messageTemplate.querySelector(".time").textContent = getTime();
	} else {
		messageTemplate = variables.templateOutsideMessage.content.cloneNode(true);
		messageTemplate.querySelector(".nickname").textContent = "собеседник";
		messageTemplate.querySelector(".text").textContent = text;
		messageTemplate.querySelector(".time").textContent = getTime();
	}
	return messageTemplate;
}

function renderMessages(node) {
	variables.messagesField.append(node);
}

const popupAreaHandler = (e) => {
	if (e.target === variables.popup) {
		variables.popup.style.display = "none";
	}
};

const settingsBtnHandler = () => {
	variables.popup.style.display = "flex";
	variables.popup.addEventListener("click", popupAreaHandler);
};

const popupCloseBtnHandler = () => {
	variables.popup.style.display = "none";
};

const themeBtnHandler = (e) => {
	changeTheme(e.target);
};

const btnSendingMessageHandler = (e) => {
	e.preventDefault();
	const messageText = variables.inputForMessage.value;
	variables.formForMessage.reset();
	if (isEmpty(messageText)) return;
	const message = creatMessageNode(messageText, "me");
	renderMessages(message);
};

variables.settingsBtn.addEventListener("click", settingsBtnHandler);

variables.popupCloseBtn.addEventListener("click", popupCloseBtnHandler);

variables.themeBtn.addEventListener("click", themeBtnHandler);

variables.btnSendMessage.addEventListener("click", btnSendingMessageHandler);
