import { NAME_LENGTH } from "./constants";

export function validateEmail(email) {
	const emailRegular =
		/^(([^<>()[\].,;:"@\s]+(\.[^<>()[\].,;:"@\s]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	return emailRegular.test(email);
}

export function validateToken(token) {
	const russianLetterRegex = /^[а-яА-ЯёЁ]+$/;
	return russianLetterRegex.test(token);
}

export function validateName(name) {
	return name.length >= NAME_LENGTH;
}

export function isEmpty(input) {
	return !input || input.trim() === "";
}
