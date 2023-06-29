import { VARIABLES } from "./variables.js";

// * функция получения актуального времени

export function getCurrentDate() {
	const now = new Date();
	const hours = now.getHours();
	const min = String(now.getMinutes());
	const actualTime = `${hours}:${min.padStart(2, "0")}`;
	return actualTime;
}

// * функция очистки поля ввода сообщения

export function clearInput() {
	VARIABLES.MESSAGE_FORM.reset();
}

// * функция проверки пустой строки

export function isMessageEmpty(message) {
	return !message.trim();
}
