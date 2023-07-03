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

export const MODAL = {
	AUTHORIZATION: {
		SING_IN: document.querySelector(".chat-btn_sign-in"),
		DIALOG: document.querySelector(".authorization"),
		FORM: document.querySelector(".modal-form_authorization"),
		EMAIL: document.querySelector(".input-authorization"),
		BTN_GET: document.querySelector(".authorization-btn_get"),
		BTN_ENTER: document.querySelector(".authorization-btn_enter"),
	},
};
