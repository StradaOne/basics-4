import { formElement, inputElement, preloader } from "./ui-variables.js";
import { history } from "../script.js";

export function getLink() {
	const serverUrl = 'https://api.genderize.io';
	const name = new FormData(formElement).get('name');
	return `${serverUrl}?name=${name}`;
}

export function getIndex(paul) {
	return history.findIndex(({name, gender}) => `${name} is ${gender}` === paul.textContent)
}

export function isPaulExist(paul) {
	for (let i = 0; i < history.length; i++) {
		if (history[i].name === paul.name) {
			return true
		}
	}
	return false
}

export function isInputEmpty() {
	return inputElement.value.trim() === ''
}

export function showLoader() {
	preloader.style.display = 'block'
}

export function hideLoader() {
	preloader.style.display = 'none'
}