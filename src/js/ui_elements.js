const tmpl = document.querySelector("#myMessage");
const UI_ELEMNTS = {
	POPUP_MAIN_MENU: document.querySelector(".main-menu"),
	SCREEN: document.querySelector(".mainScreen"),
	WRAP: document.querySelector(".wrap"),
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
	SETTINGS_INPUT: document.querySelector(".settings-menu_input"),
	SETTINGS_BUTTON: document.querySelector(".settings-menu_button"),
	SETTINGS_FORM: document.querySelector(".settings-menu_form"),
};

const POPUP_LOGIN = {
	POPUP_LOGIN_MENU: document.querySelector(".log-menu"),
	LOGIN_FORM: document.querySelector(".log-menu_form"),
	LOGIN_INPUT: document.querySelector(".log-menu_input"),
	LOGIN_BTN_GET: document.querySelector(".log-menu_button_get"),
	LOGIN_BTN_SET: document.querySelector(".log-menu_button_set"),
};

const POPUP_CONFIRM = {
	POPUP_CONFIRM_MENU: document.querySelector(".confirm-menu"),
	CONFIRM_INPUT: document.querySelector(".confirm-menu_input"),
	CONFIRM_BUTTON: document.querySelector(".confirm-menu_button_sign"),
	CONFIRM_FORM: document.querySelector(".confirm-menu_form"),
};
export { UI_ELEMNTS, tmpl, M_TEMPLATE, POPUP_SETTINGS, POPUP_LOGIN, POPUP_CONFIRM };
