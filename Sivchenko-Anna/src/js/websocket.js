import Cookies from "js-cookie";
import { VARIABLES } from "./variables.js";
import { createMessage } from "./message.js";
import { scrollToEnd } from "./utils.js";

let socket = null;

// * функция парсинга сообщения

async function parseMessage(event) {
	try {
		const data = JSON.parse(event.data);
		const {
			user: { email, name },
			text,
			updatedAt,
		} = data;
		const message = await createMessage({
			userName: name,
			text,
			time: updatedAt,
			email: email,
		});
		VARIABLES.CHAT_SCREEN.append(message);
		scrollToEnd();
	} catch (err) {
		console.log(err.message);
	}
}

// * функция отлова закрытия соединения с Web Socket

export function handleClose() {
	console.log("WebSocket is closed");
	const token = Cookies.get("token");
	return token ? setTimeout(() => connectToWebSocket(token), 1000) : null;
}

// * функция подключения к Web Socket

export function connectToWebSocket(token) {
	try {
		if (socket !== null && socket.readyState === 1) {
			console.log("соединение уже открыто");
			return;
		}
		socket = new WebSocket(`wss://edu.strada.one/websockets?${token}`);
		socket.addEventListener("message", parseMessage);
		socket.addEventListener("close", handleClose);
	} catch (err) {
		console.log(err.message);
	}
}

// * функция отправки сообщения всем клиентам

export function sendWebSoket(text) {
	try {
		socket.send(JSON.stringify({ text: text }));
	} catch (err) {
		console.log(err.message);
	}
}

// * функция закрытия соединения с Web Socket

export function closeWebSocket() {
	socket.close();
}
