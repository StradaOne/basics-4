import { ELEMENTS } from "./modules/ui_elements";
import { getCurrentTime, scrollToBottom } from "./modules/utils";
import { isEmpty } from "./modules/validations";

function renderMessage(nickName, text, time) {
	if (!isEmpty(text)) {
		return;
	}

	const messageClass = nickName === "darkes" ? "ours-message" : "theirs-message";
	const messageElement = ELEMENTS.MESSAGE.TEMPLATE.content.cloneNode(true);
	const messageListItem = messageElement.querySelector(".main__message-li");
	const messageNickNameElement = messageElement.querySelector(".main__nick-name-message");
	const messageTextElement = messageElement.querySelector(".main__message-text");
	const messageTimeElement = messageElement.querySelector(".time-of-message");

	messageListItem.classList.add(messageClass);
	messageNickNameElement.textContent = nickName;
	messageTextElement.textContent = text;
	messageTimeElement.textContent = time || getCurrentTime();

	ELEMENTS.MESSAGE.MESSAGE_LIST.append(messageElement);
	scrollToBottom();
}

ELEMENTS.CHAT_FORM.FORM.addEventListener("submit", (e) => {
	e.preventDefault();
	const inputValue = new FormData(ELEMENTS.CHAT_FORM.FORM).get("chat-form");
	renderMessage("darkes", inputValue);
	ELEMENTS.CHAT_FORM.FORM.reset();
});

renderMessage("Polina", "Hello!");
