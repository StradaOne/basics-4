const url = "https://edu.strada.one/api/user";

// * функция запроса для авторизации

export async function receiveCodeByEmail(email) {
	try {
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email }),
		});
		const answer = await response.json();

		if (!response.ok) {
			console.log("Error from the server");
		}
	} catch (err) {
		console.log(err.message);
	}
}
