export async function setName(name, code) {
	try {
		const patchResponse = await fetch('https://edu.strada.one/api/user', {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${code}`,
			},
			body: JSON.stringify({ name: name }),
		});

		if (!patchResponse.ok) {
			throw new Error(
				`Ошибка при сохранении имени: ${patchResponse.status} ${patchResponse.statusText}`,
			);
		}
	} catch (error) {
		throw new Error(`Ошибка при сохранении имени: ${error.message}`);
	}
}

export async function getUserData(code) {
	try {
		const getResponse = await fetch('https://edu.strada.one/api/user/me', {
			headers: {
				Authorization: `Bearer ${code}`,
			},
		});

		if (!getResponse.ok) {
			throw new Error(
				`Ошибка при получении данных о пользователе: ${getResponse.status} ${getResponse.statusText}`,
			);
		}

		return await getResponse.json();
	} catch (error) {
		throw new Error(`Ошибка при получении данных о пользователе: ${error.message}`);
	}
}

export async function updateUserName(name, code) {
	try {
		await setName(name, code);
		const userData = await getUserData(code);
		console.log(userData);
	} catch (error) {
		console.error(error);
	}
}
