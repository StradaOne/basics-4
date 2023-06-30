import { createElement, getElement } from './domUtils';

const popupOverlay = getElement('.popup-overlay');

function closePopup(e) {
	if (!e.target.classList.contains('popup-overlay') && !e.target.classList.contains('close')) {
		return;
	}

	popupOverlay.classList.remove('open');
}

document.addEventListener('keydown', e => {
	if (e.key === 'Escape') {
		popupOverlay.classList.remove('open');
	}
});

popupOverlay.addEventListener('click', closePopup);

function PopupHeader(text) {
	const header = createElement('div');

	header.textContent = text;

	return header;
}

function AuthorizationContent() {
	return `
		<label for="email">Email:</label>
		<input type="email" id="email" value="vow.carlin@yandex.ru"/>
		<div class="buttons">
			<button class="btn" id="get-code-btn">Получить код</button>
			<button class="btn" id="enter-code-btn">Ввести код</button>
		</div>
	`;
}

function ConfirmationContent() {
	return `
		<label for="code">Код:</label>
		<input type="text" id="code" />
		<button class="btn" id="login-btn">Войти</button>
	`;
}

function SettingsContent() {
	return `
		<label for="nickname">Имя в чате:</label>
		<input type="text" id="nickname" />
		<button class="btn" id="save-btn">&rarr;</button>
	`;
}

function CreatePopup(data) {
	const popup = createElement('div');
	const close = createElement('span');
	const popupTitle = PopupHeader(data.title);
	const content = createElement('div');

	content.classList.add('content');
	popup.classList.add('popup');
	close.innerHTML = '&times';
	close.classList.add('close');

	// close.addEventListener('click', closePopup);

	if (data.type === 'authorization') {
		content.innerHTML = AuthorizationContent();
	} else if (data.type === 'confirmation') {
		content.innerHTML = ConfirmationContent();
	} else if (data.type === 'settings') {
		content.innerHTML = SettingsContent();
	}

	popup.appendChild(popupTitle);
	popup.appendChild(close);
	popup.appendChild(content);

	return popup;
}

export function openPopup(content) {
	popupOverlay.innerHTML = '';

	const popup = CreatePopup(content);

	popupOverlay.classList.add('open');

	popupOverlay.appendChild(popup);
}
