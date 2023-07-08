import Cookies from "js-cookie";
import { creatMessageNode, processData } from "./message";
import { apiVariables, variables } from "./ui_variables";
import { popupAuthorization } from "./popups";
import { render } from "./DOM_render";

let socket = null;

const gettingMessageHandler = (event) => {
	console.log(event.data);
	try {
		const data = JSON.parse(event.data);
		console.log(data);
		const processedData = processData(data);
		const messageNode = creatMessageNode(processedData);
		variables.messagesField.append(messageNode);
		variables.messagesField.scrollTop += 1e9;
	} catch (error) {
		console.log(error);
	}
};

const closureConnetionHandler = (event) => {
	console.log("connection closed");
	const token = Cookies.get(apiVariables.tokenCookieName);
	if (!token && variables.popup.style.display === "none") {
		render(popupAuthorization, variables.popupWindow);
		variables.popup.style.display = "flex";
	}
	setTimeout(() => connectWs(token), 10);
};

export function connectWs(token) {
	if (socket !== null && socket.readyState === 1) {
		console.log("соединение уже открыто");
		return;
	}
	socket = new WebSocket(`wss://edu.strada.one/websockets?${token}`);
	socket.onopen = function (e) {
		console.log("Соединение установлено");
	};
	socket.addEventListener("message", gettingMessageHandler);
	socket.addEventListener("close", closureConnetionHandler);
}

export function sendMessageByWs(message) {
	socket.send(JSON.stringify({ text: message }));
	variables.messagesField.scrollTop += 1e9;
}

export function closeConnectionWs() {
	if (socket !== null && socket.readyState === 1) {
		socket.close();
		console.log("переподключение");
	}
	console.log("соединения ещё нет");
}