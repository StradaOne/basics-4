import { LocalStorageError, errorHandler, ERRORS } from "./errors";

const { LOCALSTORAGE_ERROR_SAVE, LOCALSTORAGE_ERROR_LOAD } = ERRORS;

export function saveToLocalStorage(key, value) {
	try {
		localStorage.setItem(key, JSON.stringify(value));
	} catch (error) {
		errorHandler(new LocalStorageError(LOCALSTORAGE_ERROR_SAVE));
	}
}

export function loadFromLocalStorage(key) {
	try {
		const result = JSON.parse(localStorage.getItem(key));
		return result;
	} catch (error) {
		errorHandler(new LocalStorageError(LOCALSTORAGE_ERROR_LOAD));
		return null;
	}
}
