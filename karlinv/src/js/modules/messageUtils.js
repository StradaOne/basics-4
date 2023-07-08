const Cookies = require('js-cookie');

const URL = 'https://edu.strada.one/api/messages/';

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

export async function getMessages(url, code) {
	try {
		const response = await fetch(url, {
			headers: {
				Authorization: `Bearer ${code}`,
			},
		});

		const data = await response.json();

		const { messages } = data;

		const messageElements = messages.map(message =>
			createMessage(message.user.name, message.text, message.createdAt, 'you'),
		);

		const messagesHtml = document.querySelector('.messages');

		messagesHtml.append(...messageElements);
	} catch (error) {
		console.error('Ошибка получения сообщений:', error);
	}
}

getMessages(URL, Cookies.get('token'));
