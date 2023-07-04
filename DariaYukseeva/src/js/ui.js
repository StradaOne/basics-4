import Cookies from "js-cookie";
import { apiVariables, variables } from "./ui_variables";
import { getTime, isEmpty } from "./utiles";
import { popupSettings, popupAuthorization, theme } from "./popups";
import { render } from "./DOM_render";

// let theme = loadFromLocalStorage("chatAppTheme") || "light";

// export function changeTheme() {
// 	theme = theme === "light" ? "dark" : "light";
// 	document.documentElement.setAttribute("data-theme", theme);
// 	saveToLocalStorage("chatAppTheme", theme);
// }

// export function setTheme() {
// 	document.documentElement.setAttribute("data-theme", theme);
// }
export const pop = "";

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

// const popupAreaHandler = (e) => {
// 	if (e.target === variables.popup) {
// 		variables.popup.style.display = "none";
// 		const popupCloseBtn = document.querySelector(".popup-close-btn");
// 		const themeBtn = document.querySelector("#theme-btn");
// 		variables.popup.removeEventListener("click", popupAreaHandler);
// 		popupCloseBtn.removeEventListener("click", popupCloseBtnHandler);
// 		themeBtn.removeEventListener("click", themeBtnHandler);
// 		variables.popup.innerHTML = "";
// 	}
// };

// const popupCloseBtnHandler = () => {
// 	variables.popup.style.display = "none";
// 	const popupCloseBtn = document.querySelector(".popup-close-btn");
// 	const themeBtn = document.querySelector("#theme-btn");
// 	variables.popup.removeEventListener("click", popupAreaHandler);
// 	popupCloseBtn.removeEventListener("click", popupCloseBtnHandler);
// 	themeBtn.removeEventListener("click", themeBtnHandler);
// 	variables.popup.innerHTML = "";
// };

// const themeBtnHandler = (e) => {
// 	changeTheme(e.target);
// };

const settingsBtnHandler = () => {
	render(popupSettings, variables.popupWindow);
	// const popupCloseBtn = document.querySelector(".popup-close-btn");
	const themeBtn = document.querySelector("#theme-btn");
	if (theme === "dark") {
		themeBtn.checked = true;
	}
	const nickname = Cookies.get(apiVariables.nickname);
	if (nickname) {
		const nicknameInput = document.querySelector(".nickname-input");
		nicknameInput.value = nickname;
	}
	variables.popup.style.display = "flex";
	// variables.popup.addEventListener("click", popupAreaHandler);
	// popupCloseBtn.addEventListener("click", popupCloseBtnHandler);
	// themeBtn.addEventListener("click", themeBtnHandler);
};

const btnSendingMessageHandler = (e) => {
	e.preventDefault();
	const messageText = variables.inputForMessage.value;
	variables.formForMessage.reset();
	if (isEmpty(messageText)) return;
	const message = creatMessageNode(messageText, "me");
	renderMessages(message);
};

const exitBtnHandler = () => {
	render(popupAuthorization, variables.popupWindow);
	variables.popup.style.display = "flex";
};

variables.settingsBtn.addEventListener("click", settingsBtnHandler);

variables.btnSendMessage.addEventListener("click", btnSendingMessageHandler);

variables.exitEnterBtn.addEventListener("click", exitBtnHandler);
