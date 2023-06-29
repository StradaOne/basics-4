export const VARIABLES = {
	MESSAGE_FORM: document.querySelector(".chat-send_form"),
	CHAT_SCREEN: document.querySelector(".chat-screen"),
	MESSAGE_TEMPLATE: document.querySelector("#message-template"),
	USER: {
		I: "Я",
		COMPANION: "Кот",
	},
};

export const MESSAGE = {
	CONTAINER: VARIABLES.MESSAGE_TEMPLATE.content.querySelector(".chat-message"),
	SENDER: VARIABLES.MESSAGE_TEMPLATE.content.querySelector(".message-sender"),
	TEXT: VARIABLES.MESSAGE_TEMPLATE.content.querySelector(".message-text"),
	TIME: VARIABLES.MESSAGE_TEMPLATE.content.querySelector(".message-time"),
	INPUT: document.querySelector(".chat-send_input"),
};
