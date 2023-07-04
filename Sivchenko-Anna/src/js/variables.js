export const VARIABLES = {
	SETTINGS_BTN: document.querySelector(".chat-btn_settings"),
	MESSAGE_FORM: document.querySelector(".chat-send_form"),
	CHAT_SCREEN: document.querySelector(".chat-screen"),
	MESSAGE_TEMPLATE: document.querySelector("#message-template"),
	USER: {
		I: "Я",
		COMPANION: "Кот",
	},
	API: {
		SERVER_URL: "https://edu.strada.one/api/user",
		USER_URL: "https://edu.strada.one/api/user/me",
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
	VERIFICATION: {
		DIALOG: document.querySelector(".verification"),
		FORM: document.querySelector(".modal-form_verification"),
		CODE: document.querySelector(".input-verification"),
		BTN_ENTER: document.querySelector(".verification-btn"),
	},
	SETTINGS: {
		DIALOG: document.querySelector(".settings"),
		FORM: document.querySelector(".modal-form_settings"),
		NAME: document.querySelector(".input-settings"),
		BTN_ENTER: document.querySelector(".settings-btn"),
		BTN_CLOSE: document.querySelector(".close-settings"),
	},
};
