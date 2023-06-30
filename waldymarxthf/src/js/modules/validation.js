import { DOM_ELEMENTS, PROPERTIES } from "./constants";

const { ERROR_AUTH, COMPLETE_AUTH } = DOM_ELEMENTS.AUTHORIZATION;

export function validateEmail(email) {
	const emailRegular =
		/^(([^<>()[\].,;:"@\s]+(\.[^<>()[\].,;:"@\s]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	if (!emailRegular.test(email)) {
		ERROR_AUTH.classList.remove(PROPERTIES.HIDDEN);
		return false;
	}
	ERROR_AUTH.classList.add(PROPERTIES.HIDDEN);
	COMPLETE_AUTH.classList.remove(PROPERTIES.HIDDEN);
	return true;
}

export function isEmpty(input) {
	return !input || input.trim() === "";
}
