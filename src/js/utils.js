// eslint-disable-next-line import/no-extraneous-dependencies
import Cookies from "js-cookie";
import { UI_ELEMNTS, POPUP_CONFIRM } from "./ui_elements";

export function getTime() {
	const now = new Date().toLocaleTimeString().slice(0, -3);
	return now;
}

export function validEmpty(text) {
	if (text === "") {
		return true;
	}
	return false;
}

export function clearInput() {
	UI_ELEMNTS.INPUT.value = "";
}

export class ValidationError extends Error {
	constructor(message) {
		super(message);
		this.name = "ValidationError";
	}
}

export function setCookie() {
	Cookies.set("code", POPUP_CONFIRM.CONFIRM_INPUT.value);
}
export function getCookie() {
	const result = Cookies.get("code"); // => 'value'
	return result;
}
