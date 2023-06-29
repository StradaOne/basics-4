import { format } from 'date-fns';

const messages = document.querySelector('.messages');
const inputForm = document.querySelector('.input-form');
const inputMessage = document.querySelector('.input-field');

function createMessage(user, value, date, style) {
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

function render() {
	const date = format(new Date(), 'HH:mm');
	const message = createMessage('KarinV', inputMessage.value, date, 'my');

	messages.append(message);

	inputMessage.value = '';
	messages.scrollTop = messages.scrollHeight;
}

inputForm.addEventListener('submit', e => {
	e.preventDefault();
	if (!inputMessage.value) return;

	render();
});

inputForm.addEventListener('keydown', e => {
	if (e.key === 'Enter') {
		e.preventDefault();
		render();
	}
});
