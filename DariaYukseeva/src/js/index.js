import Cookies from "js-cookie";
import { setTheme, popupSettings, popupAuthorization, theme } from "./popups";
import { variables, apiVariables } from "./ui_variables";
import { showMessageHistory } from "./message";
import { render } from "./DOM_render";
import { connectWs, sendMessageByWs } from "./websocket";
import { isEmpty } from "./utiles";

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

variables.settingsBtn.addEventListener("click", settingsBtnHandler);

variables.btnSendMessage.addEventListener("click", btnSendingMessageHandler);

variables.exitEnterBtn.addEventListener("click", logoutBtnHandler);

function init() {
	setTheme();
	const token = Cookies.get(apiVariables.tokenCookieName);
	if (!token) {
		render(popupAuthorization, variables.popupWindow);
		const authorizationMessageNode = document.querySelector(".authorization-message");
		authorizationMessageNode.textContent = `Необходимо авторизоваться`;
		authorizationMessageNode.classList.add("authorization-message-visible-wrong");
		variables.popup.style.display = "flex";
	}
	if (token) {
		connectWs(token);
		showMessageHistory();
		variables.messagesField.scrollTop += 1e9;
	}
}

init();
