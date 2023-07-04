import Cookies from "js-cookie";
import {
	REQUEST_HEADER,
	REQUEST_METOD,
	SERVER_URL,
	TOKEN,
	USER_URL,
	MESSAGES_URL,
	ERRORS,
	BETTERTV_URL,
} from "./constants";
import { errorHandler, ServerError, AuthorizationError } from "./errors";

export async function getMailRequest(email) {
	try {
		const response = await fetch(SERVER_URL, {
			method: REQUEST_METOD.POST,
			headers: REQUEST_HEADER.DEFAULT_HEADER,
			body: JSON.stringify({ email }),
		});

		if (!response.ok) {
			throw new ServerError(ERRORS.SERVER_ERROR);
		}

		await response.json();
	} catch (error) {
		errorHandler(error);
	}
}

export async function changeNameRequest(name) {
	try {
		const response = await fetch(SERVER_URL, {
			method: REQUEST_METOD.PATCH,
			headers: {
				...REQUEST_HEADER.DEFAULT_HEADER,
				Authorization: `Bearer ${Cookies.get(TOKEN)}`,
			},
			body: JSON.stringify({ name }),
		});

		if (!response.ok) {
			throw new ServerError(ERRORS.SERVER_ERROR);
		}

		return await response.json();
	} catch (error) {
		errorHandler(error);
		return false;
	}
}

export async function getUserDataRequest(token) {
	try {
		const response = await fetch(USER_URL, {
			method: REQUEST_METOD.GET,
			headers: {
				...REQUEST_HEADER.DEFAULT_HEADER,
				Authorization: `Bearer ${token}`,
			},
		});

		if (!response.ok) {
			throw new AuthorizationError(ERRORS.AUTHENTICATION_ERROR);
		}
		return await response.json();
	} catch (error) {
		errorHandler(error);
		return false;
	}
}

export async function getMessages() {
	try {
		const response = await fetch(MESSAGES_URL, {
			method: REQUEST_METOD.GET,
			headers: {
				...REQUEST_HEADER.DEFAULT_HEADER,
				Authorization: `Bearer ${Cookies.get(TOKEN)}`,
			},
		});

		if (!response.ok) {
			throw new ServerError(ERRORS.SERVER_ERROR);
		}

		return await response.json();
	} catch (error) {
		errorHandler(error);
		return false;
	}
}

export async function getBetterTVEmoji() {
	try {
		const response = await fetch(BETTERTV_URL);

		if (!response.ok) {
			throw new ServerError(ERRORS.SERVER_ERROR);
		}

		return await response.json();
	} catch (error) {
		errorHandler(error);
		return false;
	}
}
