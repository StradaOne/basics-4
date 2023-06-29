import { SELECTORS, DOM_ELEMENTS, PROPERTIES } from "./modules/ui-variables";
import { isEmpty } from "./modules/utils";

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

	const { WINDOW, TEMPLATE } = DOM_ELEMENTS.CHAT;

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

DOM_ELEMENTS.FORM.addEventListener("submit", (event) => {
	event.preventDefault();
	const inputValue = new FormData(DOM_ELEMENTS.FORM).get("message");
	renderMessage("waldymarxthf", inputValue, "12:00");
	DOM_ELEMENTS.FORM.reset();
});

renderMessage("waldymarxthf", "Привет, это сообщение справа!", "12:00");

renderMessage(
	"Илья⚛️",
	"Привет, это сообщение слева!",
	"./avatars/photo_2023-06-28_23-10-57.jpg",
	"12:01",
);
