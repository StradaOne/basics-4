import Cookies from "js-cookie";
import { DOM_ELEMENTS, TOKEN, NICKNAME } from "./modules/constants";
import {
	handleFormAuth,
	handleFormSettings,
	handleFormVerif,
	handleFormMessage,
} from "./modules/handler";
import { modalSwitcher } from "./modules/modalActions";
import { hideSendButton, renderMessage, initializeUI } from "./modules/ui";
import { handleScrollVisibility, scrollToEnd } from "./modules/scroll";
import { saveToLocalStorage } from "./modules/localStorage";

const { MODAL_AUTH, FORM_AUTH, ENTER_BUTTON } = DOM_ELEMENTS.AUTHORIZATION;
const { FORM_SETTINGS, MODAL_SETTINGS, INPUT_SETTINGS, THEME_SETTINGS } = DOM_ELEMENTS.SETTINGS;
const { FORM_MESSAGE, INPUT_MESSAGE, SETTINGS_BUTTON, CHAT_WINDOW, QUIT_BUTTON, ANCHOR, BODY } =
	DOM_ELEMENTS.CHAT;
const { MODAL_VERIF, BACK_BUTTON, FORM_VERIF } = DOM_ELEMENTS.VERIFICATION;

renderMessage("waldymarxthf", "Привет, это сообщение справа!", "12:00");

renderMessage(
	"Илья⚛️",
	"Привет, это сообщение слева!",
	"./avatars/photo_2023-06-28_23-10-57.jpg",
	"12:01",
);

FORM_MESSAGE.addEventListener("submit", handleFormMessage);
FORM_AUTH.addEventListener("submit", handleFormAuth);
FORM_SETTINGS.addEventListener("submit", handleFormSettings);
FORM_VERIF.addEventListener("submit", handleFormVerif);

INPUT_MESSAGE.addEventListener("input", hideSendButton);
ANCHOR.addEventListener("click", scrollToEnd);
CHAT_WINDOW.addEventListener("scroll", handleScrollVisibility);

ENTER_BUTTON.addEventListener("click", modalSwitcher(MODAL_AUTH, MODAL_VERIF));
BACK_BUTTON.addEventListener("click", modalSwitcher(MODAL_VERIF, MODAL_AUTH));
MODAL_VERIF.addEventListener("cancel", modalSwitcher(MODAL_VERIF, MODAL_AUTH));

MODAL_AUTH.addEventListener("cancel", (event) => {
	event.preventDefault();
});

QUIT_BUTTON.addEventListener("click", () => {
	MODAL_AUTH.showModal();
	Cookies.remove(TOKEN);
	Cookies.remove(NICKNAME);
});

SETTINGS_BUTTON.addEventListener("click", () => {
	MODAL_SETTINGS.showModal();
	INPUT_SETTINGS.value = Cookies.get(NICKNAME);
});

THEME_SETTINGS.addEventListener("change", function () {
	BODY.className = this.value;
	saveToLocalStorage("theme", this.value);
});

document.addEventListener("DOMContentLoaded", initializeUI);
