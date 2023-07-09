import { format } from "date-fns";
import { VARIABLES } from "./variables";

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

export function isValueEmpty(value) {
	return !value.trim();
}

// * функция смены модального окна

export function modalChange(actualModal, nextModal) {
	actualModal.close();
	nextModal.showModal();
}

// * функция проверки валидности email

export function isEmailValid(value) {
	const EMAIL_REGEXP =
		/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
	return EMAIL_REGEXP.test(value);
}

// // * функция проверки валидности email

// export function isCodeValid(value) {
// 	const regex = /^[а-яА-ЯёЁ]+$/;
// 	return regex.test(value);
// }

// * функция прокрутки скролла вниз

export function scrollToEnd() {
	VARIABLES.CHAT_SCREEN.scrollIntoView({ behavior: "smooth", block: "end" });
}
