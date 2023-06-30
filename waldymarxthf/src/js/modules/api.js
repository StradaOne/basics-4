import { validateEmail } from "./validation";
import { REQUEST_HEADER, REQUEST_METOD } from "./constants";

const serverUrl = "https://edu.strada.one/api/user";

export async function getData(email) {
	try {
		if (!validateEmail(email)) {
			return;
		}

		const response = await fetch(serverUrl, {
			method: REQUEST_METOD.POST,
			headers: REQUEST_HEADER.DEFAULT_HEADER,
			body: JSON.stringify({ email }),
		});
		await response.json();
	} catch (error) {
		console.error(error);
	}
}
