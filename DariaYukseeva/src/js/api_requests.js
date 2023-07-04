import Cookies from "js-cookie";
import { apiVariables } from "./ui_variables";

export async function getCode(email) {
	const url = " https://edu.strada.one/api/user";
	try {
		const respons = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json;charset=utf-8",
			},
			body: JSON.stringify({ email }),
		});
		if (respons.ok) {
			const answer = await respons.json();
			console.log(answer);
			return true;
		}
	} catch (err) {
		console.log(err);
		return err.message;
	}
}

export async function changeNameFetch(name) {
	const url = "https://edu.strada.one/api/user";
	const token = Cookies.get(apiVariables.tokenCookieName);
	try {
		const respons = await fetch(url, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json;charset=utf-8",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ name }),
		});
		if (!respons.ok) {
			throw new Error("Ошибка");
		}
		const answer = await respons.json();
		console.log(answer);
	} catch (error) {
		console.log(error);
	}
}

export async function getUserInfoFetch() {
	const url = "https://edu.strada.one/api/user/me";
	try {
		const respons = await fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json;charset=utf-8",
				Authorization: `Bearer ${Cookies.get(apiVariables.tokenCookieName)}`,
			},
		});
		const data = await respons.json();
		console.log(data);
		return data;
	} catch (error) {
		console.log(error);
		return false;
	}
}
