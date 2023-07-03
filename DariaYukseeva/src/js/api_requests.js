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
		const answer = await respons.json();
		console.log(answer);
		return answer;
	} catch (err) {
		console.log(err);
	}
}
