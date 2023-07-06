/* eslint-disable no-undef */
import { POPUP_LOGIN, POPUP_SETTINGS } from "./ui_elements";
import { getCookie } from "./utils";

export async function getCode() {
	const response = await fetch("https://edu.strada.one/api/user ", {
		method: "POST",
		// mode: "no-cors",
		headers: {
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": "*",
		},
		body: JSON.stringify({ email: POPUP_LOGIN.LOGIN_INPUT.value }),
	});
}

export async function getUserInfo() {
	const token = getCookie();
	const response = await fetch("https://edu.strada.one/api/user/me", {
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	const result = await response.json();
	return result;
}

export async function changeName() {
	const token = getCookie();
	const response = await fetch("https://edu.strada.one/api/user", {
		method: "PATCH",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": "*",
		},
		body: JSON.stringify({ name: POPUP_SETTINGS.SETTINGS_INPUT.value }),
	});
	localStorage.setItem("lastName", POPUP_SETTINGS.SETTINGS_INPUT.value);
}

export async function getHistory() {
	const token = getCookie();
	const response = await fetch(" https://edu.strada.one/api/messages/ ", {
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	const result = await response.json();
	console.log(response);
	console.log(result);
	return result;
}
