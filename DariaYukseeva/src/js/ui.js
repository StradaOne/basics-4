import Cookies from "js-cookie";
import { apiVariables, variables } from "./ui_variables";
import { getTime, isEmpty } from "./utiles";
import { popupSettings, popupAuthorization, theme } from "./popups";
import { render } from "./DOM_render";
import { getMessagesFetch } from "./api_requests";

export const pop = "";

function creatMessageNode({ createdAt, text, updatedAt, email, userNickname }) {
	let messageTemplate = null;
	const userEmail = Cookies.get(apiVariables.email);
	if (email === userEmail) {
		messageTemplate = variables.templateMyMessage.content.cloneNode(true);
		messageTemplate.querySelector(".text").textContent = text;
		messageTemplate.querySelector(".time").textContent = getTime();
	} else {
		messageTemplate = variables.templateOutsideMessage.content.cloneNode(true);
		messageTemplate.querySelector(".nickname").textContent = userNickname;
		messageTemplate.querySelector(".text").textContent = text;
		messageTemplate.querySelector(".time").textContent = getTime(createdAt);
	}
	return messageTemplate;
}

function renderMessages(node) {
	variables.messagesField.append(...node);
}

function getProcessedMessageHistory(data) {
	const { messages } = data;
	const messagesArray = [];
	messages.forEach((el) => {
		const {
			createdAt,
			text,
			updatedAt,
			user: { email, name },
		} = el;
		const processedData = {
			createdAt,
			text,
			updatedAt,
			userEmail: email,
			userNickname: name,
		};
		const messageNode = creatMessageNode(processedData);
		messagesArray.push(messageNode);
	});
	return messagesArray.reverse();
}

export async function showMessageHistory() {
	const data = await getMessagesFetch();
	const messagesArray = getProcessedMessageHistory(data);
	renderMessages(messagesArray);
	variables.messagesField.scrollTop += 1e9;
}

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
	const message = creatMessageNode(messageText, "me");
	renderMessages(message);
	variables.messagesField.scrollTop += 1e9;
};

const exitBtnHandler = () => {
	render(popupAuthorization, variables.popupWindow);
	const inputEmail = document.querySelector(".email-input");
	variables.popup.style.display = "flex";
	inputEmail.focus();
};

variables.settingsBtn.addEventListener("click", settingsBtnHandler);

variables.btnSendMessage.addEventListener("click", btnSendingMessageHandler);

variables.exitEnterBtn.addEventListener("click", exitBtnHandler);
