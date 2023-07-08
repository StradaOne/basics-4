export async function sendRequestToAPI(url, email) {
	const data = {
		email: email,
	};

	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	};

	try {
		const response = await fetch(url, options);

		if (response.ok) {
			console.log('Запрос успешно отправлен');
		} else {
			console.log('Ошибка при отправке запроса:', response.status);
		}
	} catch (error) {
		console.log('Ошибка при выполнении запроса:', error);
	}
}

// sendRequestToAPI();
