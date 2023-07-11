import Cookies from "js-cookie";
import { variables, apiVariables, lockalStorageVariables } from "./ui_variables";
import { getTime, saveToLocalStorage, loadFromLocalStorage } from "./utiles";
import { getMessagesFetch } from "./api_requests";

export const messageHistory = {
	messageArray: [],
	firstShownMessage: 0,
	lastShownMessage: 19,
	// lastUploadedMessageTime: "",
};

export function creatMessageNode({ createdAt, text, updatedAt, userEmail, userNickname }) {
	let messageTemplate = null;
	const myEmail = Cookies.get(apiVariables.email);
	if (userEmail === myEmail) {
		messageTemplate = variables.templateMyMessage.content.cloneNode(true);
		messageTemplate.querySelector(".text").textContent = text;
		messageTemplate.querySelector(".time").textContent = getTime(createdAt);
	} else {
		messageTemplate = variables.templateOutsideMessage.content.cloneNode(true);
		messageTemplate.querySelector(".nickname").textContent = userNickname;
		messageTemplate.querySelector(".text").textContent = text;
		messageTemplate.querySelector(".time").textContent = getTime(createdAt);
	}
	return messageTemplate;
}

export function renderMessages(node) {
	variables.messagesField.prepend(...node);
}

export async function saveMessagesHistory() {
	const data = await getMessagesFetch();
	messageHistory.messageArray = data.messages;
}

export async function showMessageHistory() {
	const messagesForRender = messageHistory.messageArray.slice(
		messageHistory.firstShownMessage,
		messageHistory.lastShownMessage + 1,
	);
	if (messagesForRender.length > 0) {
		const nodesWithMessages = getProcessedMessageHistory(messagesForRender);
		renderMessages(nodesWithMessages.reverse());
		messageHistory.firstShownMessage += 20;
		messageHistory.lastShownMessage += 20;
	} else if (
		variables.messagesField.firstElementChild.classList.contains("message") ||
		variables.messagesField.firstElementChild.classList.contains("received-message-wrapper")
	) {
		console.log("Вся история загружена");
		const finalMessage = document.createElement("div");
		finalMessage.textContent = "Вся история загружена";
		finalMessage.classList.add("final-mes");
		variables.messagesField.prepend(finalMessage);
	}
}

export function processData(data) {
	const {
		createdAt,
		text,
		updatedAt,
		user: { email, name },
	} = data;
	const processedData = {
		createdAt,
		text,
		updatedAt,
		userEmail: email,
		userNickname: name,
	};
	return processedData;
}

export function getProcessedMessageHistory(data) {
	// const { messages } = data;
	const messagesArray = [];
	data.forEach((el) => {
		const processedData = processData(el);
		const messageNode = creatMessageNode(processedData);
		messagesArray.push(messageNode);
	});
	return messagesArray;
}

// export function saveLastMessageTime(date) {
// 	messageHistory.lastUploadedMessageTime = date.createdAt;
// 	saveToLocalStorage(
// 		lockalStorageVariables.lastUploadedMessage,
// 		messageHistory.lastUploadedMessageTime,
// 	);
// }
