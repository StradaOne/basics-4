const tmpl = document.querySelector("#myMessage");
const UI_ELEMNTS = {
	SCREEN: document.querySelector(".mainScreen"),
	INPUT: document.querySelector(".chat-form-input"),
	FORM: document.querySelector(".chat-form"),
	MAIN_SETTINGS_BTN: document.querySelector(".main-settings-btn"),
};
const M_TEMPLATE = {
	CONTAINER: tmpl.content.querySelector(".message-box"),
	SENDER: tmpl.content.querySelector(".message-sender"),
	TEXT: tmpl.content.querySelector(".message-text"),
	TIME: tmpl.content.querySelector(".message-time"),
};

const POPUP_SETTINGS = {
	SETTINGS_MENU: document.querySelector(".settings-menu"),
};

const POPUP_LOGIN = {
	POPUP_LOGIN_MENU: document.querySelector(".login-menu"),
	LOGIN_FORM: document.querySelector(".log-menu_form"),
	LOGIN_BTN_GET: document.querySelector(".log-menu_button_get"),
	LOGIN_BTN_SET: document.querySelector(".log-menu_button_set"),
};
export { UI_ELEMNTS, tmpl, M_TEMPLATE, POPUP_SETTINGS, POPUP_LOGIN };
