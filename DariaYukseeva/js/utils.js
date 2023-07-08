import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

export const getDOMElement = (selector) => document.querySelector(selector);

export function timeConverter(unixTimestamp, timeZone) {
	const date = new Date((unixTimestamp + timeZone) * 1000);
	const localDate = utcToZonedTime(date, "UTC");
	const formatedDate = format(localDate, "HH:mm");

	return formatedDate;
}

export function dateConverter(unixTimestamp, timeZone) {
	const date = new Date((unixTimestamp + timeZone) * 1000);
	const localDate = utcToZonedTime(date, "UTC");
	const formatedDate = format(localDate, "d LLLL");

	return formatedDate;
}

export function saveToLocalStorage(key, object) {
	localStorage.setItem(key, JSON.stringify(object));
}

export function loadFromLocalStorage(key) {
	return JSON.parse(localStorage.getItem(key));
}
