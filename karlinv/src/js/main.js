/* global WebSocket */
import { format } from 'date-fns';
import { URL } from './modules/constants';
import { createMessage, getMessages } from './modules/messageUtils';
import { getElement, appendElement, setElementValue, setScrollTop } from './modules/domUtils';
import { openPopup, closePopup } from './modules/popup';
import { sendRequestToAPI } from './modules/emailRequest';
import { setName } from './modules/updateUserName';

const Cookies = require('js-cookie');

const myEmail = 'vow.carlin@yandex.ru';
Cookies.set('myemail', myEmail);

const messages = getElement('.messages');
const inputForm = getElement('.input-form');
const inputMessage = getElement('.input-field');
const btnLogin = getElement('#btn-open-window-login');
const socket = new WebSocket(`wss://${URL.socket}?${Cookies.get('token')}`);

document.addEventListener('DOMContentLoaded', () => {
	if (Cookies.get('token')) {
		btnLogin.textContent = 'Выйти';
	}
});

function getBtnCodeToEmail(e) {
	const element = e;
	const blockTime = 30000;
	let timeLeft = blockTime / 1000;

	const email = getElement('#email');

	element.setAttribute('disabled', '');
	element.textContent = `${timeLeft} сек`;

	const countdownInterval = setInterval(() => {
		timeLeft -= 1;
		element.textContent = `${timeLeft} сек`;

		if (timeLeft <= 0) {
			clearInterval(countdownInterval);
			element.removeAttribute('disabled');
			element.textContent = 'Получить код';
		}
	}, 1000);

	sendRequestToAPI(URL.user, email.value);
	Cookies.set('myemail', email.value);

	email.value = '';
}

document.addEventListener('click', e => {
	const element = e.target;

	if (element.id === 'get-code-btn') {
		if (element.getAttribute('disabled')) return;
		getBtnCodeToEmail(element);

		return;
	}

	if (element.id === 'enter-code-btn') {
		openPopup({ title: 'Подтверждение', type: 'confirmation' });

		return;
	}

	if (element.id === 'btn-settings') {
		openPopup({ title: 'Настройки', type: 'settings' });
	}

	if (element.id === 'save-btn') {
		const inputSave = getElement('#nickname').value;

		if (!inputSave) return;
		setName(inputSave, Cookies.get('token'));

		closePopup(e);
	}
	if (element.id === 'login-btn') {
		const code = getElement('#code').value;
		if (!code) return;

		Cookies.set('token', code);

		btnLogin.textContent = 'Выйти';

		closePopup(e);
	}
});

function render(data) {
	messages.innerHtml = '';
	// getMessages(URL.messages, Cookies.get('token'), Cookies.get('myemail'));
	const messageElement = createMessage(
		data.user.name,
		data.text,
		format(new Date(data.createdAt), 'HH:mm'),
		data.user.email === Cookies.get('myemail') ? 'my' : 'you',
	);

	appendElement(messages, messageElement);
	setElementValue(inputMessage, '');
	setScrollTop(messages, messages.scrollHeight);
}

inputForm.addEventListener('submit', e => {
	e.preventDefault();
	if (!inputMessage.value) return;

	socket.send(JSON.stringify({ text: `${inputMessage.value}` }));
});

inputForm.addEventListener('keydown', e => {
	if (e.key === 'Enter') {
		e.preventDefault();
		if (!inputMessage.value) return;
		socket.send(JSON.stringify({ text: `${inputMessage.value}` }));
	}
});

btnLogin.addEventListener('click', e => {
	e.preventDefault();
	if (btnLogin.textContent === 'Выйти') {
		Cookies.remove('token');
		btnLogin.textContent = 'Войти';
		return;
	}

	openPopup({ title: 'Авторизация', type: 'authorization' });
});

socket.onopen = async function () {
	const messageElements = await getMessages(
		URL.messages,
		Cookies.get('token'),
		Cookies.get('myemail'),
	);

	messages.append(...messageElements);
	setScrollTop(messages, messages.scrollHeight);
};

socket.onmessage = function (event) {
	const { data } = event;

	render(JSON.parse(data));
};
