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

export function getTime(date = Date.now()) {
	const time = format(new Date(date), "HH:mm");
	return time;
}

export function isEmpty(mes) {
	return !mes.trim();
}

export function emailValidate(email) {
	const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
	return reg.test(email);
}
