/* eslint-disable no-use-before-define */
import Cookies from "js-cookie";
import { DOM_ELEMENTS, EMAIL, TOKEN } from "./constants";
import { hideElement, showElement } from "./utils";
import { createMessage } from "./chat";
import { SCROLL_HEIGHT, isNearBottom } from "./scroll";

const { COUNTER, CHAT_WINDOW, WINDOW } = DOM_ELEMENTS.CHAT;

let socket = null;
let unreadMessage = 0;

export function scrollToEnd() {
	WINDOW.scrollIntoView({ behavior: "smooth", block: "end" });
}

export function resetUnreadMessages() {
	const isScrollNearBottom = isNearBottom(CHAT_WINDOW, SCROLL_HEIGHT);
	if (isScrollNearBottom) {
		unreadMessage = 0;
		COUNTER.textContent = unreadMessage;
		hideElement(COUNTER);
	}
}

function countUnreadMessages() {
	unreadMessage += 1;
	COUNTER.textContent = unreadMessage;
	showElement(COUNTER);
}

export async function handleMessage(event) {
	try {
		const data = JSON.parse(event.data);
		const {
			text,
			user: { email, name },
			updatedAt,
		} = data;

		const message = await createMessage({
			text,
			email,
			nickname: name,
			time: updatedAt,
		});

		WINDOW.append(message);

		const isScrollNearBottom = isNearBottom(CHAT_WINDOW, SCROLL_HEIGHT);

		if (isScrollNearBottom || email === Cookies.get(EMAIL)) {
			scrollToEnd();
			resetUnreadMessages();
		} else {
			countUnreadMessages();
		}
	} catch (error) {
		console.error(error.message);
	}
}

export function handleClose() {
	console.log("WebSocket is closed");
	const token = Cookies.get(TOKEN);
	return token ? setTimeout(() => connectWebSocket(token), 1000) : null;
}

export function connectWebSocket(token) {
	try {
		/* eslint-disable no-undef */
		socket = new WebSocket(`wss://edu.strada.one/websockets?${token}`);
		socket.addEventListener("message", handleMessage);
		socket.addEventListener("close", handleClose);
	} catch (error) {
		console.error(error);
	}
}

export function sendWebSoket(text) {
	try {
		socket.send(JSON.stringify({ text: text }));
	} catch (error) {
		console.error(error.message);
	}
}

export function closeWebSoket() {
	socket.close();
}
