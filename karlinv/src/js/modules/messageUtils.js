export function createMessage(user, value, date, style) {
	const template = document.querySelector('#copy-msg');
	const copyMessage = template.content.cloneNode(true);

	const message = copyMessage.querySelector('.message');
	const messageText = copyMessage.querySelector('.message__text');
	const messageTime = copyMessage.querySelector('.message__time');

	message.classList.add(style);
	messageText.textContent = `${user}: ${value}`;
	messageTime.textContent = date;

	return message;
}

export async function getMessages(url, code, email) {
	try {
		const response = await fetch(url, {
			headers: {
				Authorization: `Bearer ${code}`,
			},
		});

		const data = await response.json();

		const { messages } = data;

		console.log(messages);

		const messageElements = messages.map(message => {
			return createMessage(
				message.user.name,
				message.text,
				message.createdAt,
				message.email === email ? 'my' : 'you',
			);
		});

		return messageElements;
	} catch (error) {
		console.error('Ошибка получения сообщений:', error);
		return [];
	}
}
