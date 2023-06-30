import { format } from "date-fns";

export function saveToLocalStorage(key, value) {
	localStorage.setItem(key, JSON.stringify(value));
}

export function loadFromLocalStorage(key) {
	try {
		return JSON.parse(localStorage.getItem(key));
	} catch (err) {
		console.log(err);
	}
}

export function getTime() {
	const time = format(new Date(), "HH:mm");
	return time;
}

export function isEmpty(mes) {
	return !mes.trim();
}
