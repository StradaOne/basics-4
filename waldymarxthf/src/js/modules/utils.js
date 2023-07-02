import { PROPERTIES } from "./constants";

export function showElement(element, className = PROPERTIES.HIDDEN) {
	element.classList.remove(className);
}

export function hideElement(element, className = PROPERTIES.HIDDEN) {
	element.classList.add(className);
}

export function getFormData(form, key) {
	return new FormData(form).get(key);
}
