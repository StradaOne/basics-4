import Cookies from "js-cookie";
import { SELECTORS, DOM_ELEMENTS, PROPERTIES, TOKEN } from "./modules/constants";
import { modalCloser, modalSwitcher, preventDefaultAction } from "./modules/modalActions";
import { isEmpty } from "./modules/validation";
import { getData } from "./modules/api";
import { toggleSendButton } from "./modules/ui";

const { MODAL_AUTH, FORM_AUTH, ENTER_BUTTON } = DOM_ELEMENTS.AUTHORIZATION;
const { WINDOW, TEMPLATE, FORM, APP, INPUT } = DOM_ELEMENTS.CHAT;
const { MODAL_VERIF, BACK_BUTTON, LOGIN_BUTTON, FORM_VERIF } = DOM_ELEMENTS.VERIFICATION;

function renderMessage(nickname, text, avatar, time = "00:00") {
	const type = nickname === "waldymarxthf" ? PROPERTIES.RIGHT_SIDE : PROPERTIES.LEFT_SIDE;
	const {
		MESSAGE_SELECTOR,
		TEXT_SELECTOR,
		TIME_SELECTOR,
		CONTENT_SELECTOR,
		AVATAR_SELECTOR,
		NICKNAME_SELECTOR,
	} = SELECTORS.CHAT;

	const item = TEMPLATE.content.cloneNode(true);
	const message = item.querySelector(MESSAGE_SELECTOR);

	message.classList.add(`message-${type}`);

	if (!isEmpty(text)) {
		message.querySelector(TEXT_SELECTOR).textContent = text;
		message.querySelector(TIME_SELECTOR).textContent = time;
		message.querySelector(CONTENT_SELECTOR).classList.add(`content-${type}`);

		if (type === PROPERTIES.LEFT_SIDE) {
			const avatarElem = message.querySelector(AVATAR_SELECTOR);
			const nicknameElem = message.querySelector(NICKNAME_SELECTOR);

			avatarElem.src = avatar;
			avatarElem.parentElement.classList.remove(PROPERTIES.HIDDEN);

			nicknameElem.textContent = nickname;
			nicknameElem.classList.remove(PROPERTIES.HIDDEN);
		}

		WINDOW.append(message);
	}

	WINDOW.scrollIntoView(false);
}

renderMessage("waldymarxthf", "Привет, это сообщение справа!", "12:00");

renderMessage(
	"Илья⚛️",
	"Привет, это сообщение слева!",
	"./avatars/photo_2023-06-28_23-10-57.jpg",
	"12:01",
);

FORM.addEventListener("submit", (event) => {
	event.preventDefault();
	const inputValue = new FormData(FORM).get("message");
	renderMessage("waldymarxthf", inputValue, "12:00");
	FORM.reset();
	toggleSendButton();
});

FORM_AUTH.addEventListener("submit", async (event) => {
	event.preventDefault();
	const inputValue = new FormData(FORM_AUTH).get("email");
	await getData(inputValue);
});

FORM_VERIF.addEventListener("submit", (event) => {
	event.preventDefault();
	const inputValue = new FormData(FORM_VERIF).get(TOKEN);
	Cookies.set(TOKEN, inputValue);
});

ENTER_BUTTON.addEventListener("click", modalSwitcher(MODAL_AUTH, MODAL_VERIF));
BACK_BUTTON.addEventListener("click", modalSwitcher(MODAL_VERIF, MODAL_AUTH));
LOGIN_BUTTON.addEventListener("click", modalCloser(MODAL_VERIF));
MODAL_VERIF.addEventListener("cancel", modalSwitcher(MODAL_VERIF, MODAL_AUTH));
MODAL_AUTH.addEventListener("cancel", preventDefaultAction);

document.addEventListener("DOMContentLoaded", () => {
	APP.classList.remove(PROPERTIES.HIDDEN);
	MODAL_AUTH.showModal();
});

INPUT.addEventListener("input", toggleSendButton);
