import Cookies from "js-cookie";
import { setTheme, popupSettings, popupAuthorization, theme } from "./popups";
import { variables, apiVariables, lockalStorageVariables } from "./ui_variables";
import { showMessageHistory, saveMessagesHistory, messageHistory } from "./message";
import { render } from "./DOM_render";
import { connectWs, sendMessageByWs } from "./websocket";
import { isEmpty, saveToLocalStorage, loadFromLocalStorage } from "./utiles";

const settingsBtnHandler = () => {
	render(popupSettings, variables.popupWindow);
	const themeBtn = document.querySelector("#theme-btn");
	const inputNickname = document.querySelector(".nickname-input");
	if (theme === "dark") {
		themeBtn.checked = true;
	}
	const nickname = Cookies.get(apiVariables.nickname);
	if (nickname) {
		const nicknameInput = document.querySelector(".nickname-input");
		nicknameInput.value = nickname;
	}
	variables.popup.style.display = "flex";
	inputNickname.focus();
};

const btnSendingMessageHandler = (e) => {
	e.preventDefault();
	const messageText = variables.inputForMessage.value;
	variables.formForMessage.reset();
	if (isEmpty(messageText)) return;
	sendMessageByWs(messageText);
	variables.messagesField.scrollTop += 1e9;
};

const logoutBtnHandler = () => {
	render(popupAuthorization, variables.popupWindow);
	const authorizationMessageNode = document.querySelector(".authorization-message");
	const token = Cookies.get(apiVariables.tokenCookieName);
	if (!token) {
		authorizationMessageNode.textContent = `Необходимо авторизоваться`;
		authorizationMessageNode.classList.add("authorization-message-visible-wrong");
	}
	const inputEmail = document.querySelector(".email-input");
	variables.popup.style.display = "flex";
	inputEmail.focus();
};

const scrollHandler = () => {
	if (variables.messagesField.scrollTop === 0) {
		const firstMessageNode = variables.messagesField.firstElementChild;
		showMessageHistory();
		firstMessageNode.scrollIntoView();
	}
};

variables.settingsBtn.addEventListener("click", settingsBtnHandler);

variables.btnSendMessage.addEventListener("click", btnSendingMessageHandler);

variables.exitEnterBtn.addEventListener("click", logoutBtnHandler);

variables.messagesField.addEventListener("scroll", scrollHandler);

async function init() {
	setTheme();
	const token = Cookies.get(apiVariables.tokenCookieName);
	// messageHistory.lastUploadedMessageTime = loadFromLocalStorage(
	// 	lockalStorageVariables.lastUploadedMessageTime,
	// )
	// 	? loadFromLocalStorage(lockalStorageVariables.lastUploadedMessageTime)
	// 	: null;
	if (!token) {
		render(popupAuthorization, variables.popupWindow);
		const authorizationMessageNode = document.querySelector(".authorization-message");
		authorizationMessageNode.textContent = `Необходимо авторизоваться`;
		authorizationMessageNode.classList.add("authorization-message-visible-wrong");
		variables.popup.style.display = "flex";
	}
	if (token) {
		connectWs(token);
		await saveMessagesHistory();
		showMessageHistory();
		variables.messagesField.scrollTop += 1e9;
	}
}

init();
