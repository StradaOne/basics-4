import { getCurrentTime } from './modules/dateUtils';
import { createMessage } from './modules/messageUtils';
import { getElement, appendElement, setElementValue, setScrollTop } from './modules/domUtils';
import { openPopup, closePopup } from './modules/popup';
import { sendRequestToAPI } from './modules/emailRequest';
import { setName, getUserData } from './modules/updateUserName';

const Cookies = require('js-cookie');

const messages = getElement('.messages');
const inputForm = getElement('.input-form');
const inputMessage = getElement('.input-field');
const btnLogin = getElement('#btn-open-window-login');
const url = 'https://edu.strada.one/api/user';

document.addEventListener('DOMContentLoaded', () => {
	if (Cookies.get('token')) {
		btnLogin.textContent = 'Выйти';
	}
});

function getBtnCodeToEmail(elements) {
	console.log(elements);
	const element = elements;
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

	sendRequestToAPI(url, email.value);

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

		console.log(inputSave);
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

async function render() {
	const date = getCurrentTime();
	const myName = await getUserData(Cookies.get('token'));

	const message = createMessage(myName.name, inputMessage.value, date, 'my');

	appendElement(messages, message);
	setElementValue(inputMessage, '');
	setScrollTop(messages, messages.scrollHeight);
}

inputForm.addEventListener('submit', e => {
	e.preventDefault();
	if (!inputMessage.value) return;

	render();
});

inputForm.addEventListener('keydown', e => {
	if (e.key === 'Enter') {
		e.preventDefault();
		if (!inputMessage.value) return;
		render();
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
