import { VARIABLES, PROPERTIES } from "./modules/ui-variables";

function renderMessage(nickname, text, avatar, time = "00:00") {
	const type = nickname === "waldymarxthf" ? PROPERTIES.RIGHT_SIDE : PROPERTIES.LEFT_SIDE;
	const {
		WINDOW_SELECTOR,
		TEMPLATE_SELECTOR,
		MESSAGE_SELECTOR,
		TEXT_SELECTOR,
		TIME_SELECTOR,
		CONTENT_SELECTOR,
		AVATAR_SELECTOR,
		NICKNAME_SELECTOR,
	} = VARIABLES.CHAT;

	const chatWindow = document.querySelector(WINDOW_SELECTOR);
	const template = document.querySelector(TEMPLATE_SELECTOR);

	const item = template.content.cloneNode(true);
	const message = item.querySelector(MESSAGE_SELECTOR);

	message.classList.add(`message-${type}`);
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

	chatWindow.append(message);
	VARIABLES.CHAT.WINDOW.scrollIntoView(false);
}

VARIABLES.FORM.addEventListener("submit", (event) => {
	event.preventDefault();
	const inputValue = new FormData(VARIABLES.FORM).get("message");
	renderMessage("waldymarxthf", inputValue, "12:00");
	VARIABLES.FORM.reset();
});

renderMessage("waldymarxthf", "Привет, это сообщение справа!", "12:00");

renderMessage(
	"Илья⚛️",
	"Привет, это сообщение слева!",
	"./avatars/photo_2023-06-28_23-10-57.jpg",
	"12:01",
);
