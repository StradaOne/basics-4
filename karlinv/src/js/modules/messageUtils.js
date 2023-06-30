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
