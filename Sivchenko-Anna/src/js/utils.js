import { format } from "date-fns";

// * функция получения актуального времени

export function getCurrentTime(time) {
	const newDate = new Date(time);
	const date = format(newDate, "HH:mm");
	return date;
}

// * функция очистки поля ввода сообщения

export function clearInput(value) {
	value.reset();
}

// * функция проверки пустой строки

export function isMessageEmpty(message) {
	return !message.trim();
}

// * функция смены модального окна

export function modalChange(actualModal, nextModal) {
	actualModal.close();
	nextModal.showModal();
}
