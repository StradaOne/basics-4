import Cookies from "js-cookie";
import { VARIABLES } from "./variables.js";

// * функция запроса для авторизации

export async function receiveCodeByEmail(email) {
	try {
		const response = await fetch(VARIABLES.API.SERVER_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json; charset=utf-8",
			},
			body: JSON.stringify({ email }),
		});
		const answer = await response.json();
		console.log(answer);

		if (!response.ok) {
			console.log("Error from the server");
		}
	} catch (err) {
		console.log(err.message);
	}
}

// * функция получения данных пользователя

export async function getUserDataRequest(token) {
	try {
		const response = await fetch(VARIABLES.API.USER_URL, {
			method: "GET",
			headers: {
				"Content-Type": "application/json; charset=utf-8",
				Authorization: `Bearer ${token}`,
			},
		});
		if (!response.ok) {
			console.log("Error from the server");
		}
		return await response.json();
	} catch (err) {
		console.log(err.message);
		return false;
	}
}

// * функция смены имени

export async function changeUserName(name) {
	try {
		const token = Cookies.get("token");
		const response = await fetch(VARIABLES.API.SERVER_URL, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json; charset=utf-8",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ name }),
		});
		if (!response.ok) {
			console.log("Error from the server");
		}
		return await response.json();
	} catch (err) {
		console.log(err.message);
		return false;
	}
}

// * функция получения истории сообщений

export async function getMessageHistory() {
	try {
		const token = Cookies.get("token");
		const response = await fetch(VARIABLES.API.MESSAGE_URL, {
			method: "GET",
			headers: {
				"Content-Type": "application/json; charset=utf-8",
				Authorization: `Bearer ${token}`,
			},
		});
		if (!response.ok) {
			console.log("Error from the server with getMessageHistory");
		}
		const data = await response.json();
		return data;
	} catch (err) {
		console.log(err.message);
		return false;
	}
}
