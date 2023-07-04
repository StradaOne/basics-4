import Cookies from "js-cookie";
import { getMailRequest, getUserDataRequest, changeNameRequest } from "./api";
import { DOM_ELEMENTS, EMAIL, TOKEN, NICKNAME, MESSAGE, MY_EMAIL } from "./constants";
import { createMessage, hideSendButton, renderMessages } from "./ui";
import { showElement, getFormData, hideElement, timeConvert } from "./utils";
import { validateEmail, validateName, validateToken, isEmpty } from "./validation";

const { FORM_AUTH, ERROR_AUTH, COMPLETE_AUTH } = DOM_ELEMENTS.AUTHORIZATION;
const { FORM_VERIF, MODAL_VERIF, ERROR_VERIF } = DOM_ELEMENTS.VERIFICATION;
const { FORM_SETTINGS, COMPLETE_SETTINGS, ERROR_SETTINGS } = DOM_ELEMENTS.SETTINGS;
const { APP, FORM_MESSAGE, WINDOW } = DOM_ELEMENTS.CHAT;

export function handleFormMessage(event) {
	event.preventDefault();
	const inputValue = getFormData(FORM_MESSAGE, MESSAGE);

	if (!isEmpty(inputValue)) {
		const message = createMessage({
			text: inputValue,
			email: MY_EMAIL,
			nickname: Cookies.get(NICKNAME),
			time: timeConvert(new Date()),
		});
		WINDOW.append(message);
		WINDOW.scrollIntoView(false);
		FORM_MESSAGE.reset();
		hideSendButton();
	}
}

export async function handleFormAuth(event) {
	try {
		event.preventDefault();
		const inputValue = getFormData(FORM_AUTH, EMAIL);

		if (validateEmail(inputValue)) {
			hideElement(ERROR_AUTH);
			await getMailRequest(inputValue);
			showElement(COMPLETE_AUTH);
			FORM_AUTH.reset();
		} else {
			showElement(ERROR_AUTH);
			hideElement(COMPLETE_AUTH);
		}
	} catch (error) {
		console.error(error.message);
		showElement(ERROR_AUTH);
	}
}

export async function handleFormVerif(event) {
	try {
		event.preventDefault();
		const inputValue = getFormData(FORM_VERIF, TOKEN);

		if (validateToken(inputValue)) {
			showElement(ERROR_VERIF);
			FORM_VERIF.reset();
			return;
		}
		const isSuccess = await getUserDataRequest(inputValue);

		if (isSuccess) {
			Cookies.set(TOKEN, inputValue, { expires: 7 });
			Cookies.set(NICKNAME, isSuccess.name);
			showElement(APP);
			hideElement(ERROR_VERIF);
			renderMessages();
			MODAL_VERIF.close();
		} else {
			showElement(ERROR_VERIF);
		}
		FORM_VERIF.reset();
	} catch (error) {
		console.error(error.message);
		showElement(ERROR_VERIF);
	}
}

export async function handleFormSettings(event) {
	try {
		event.preventDefault();
		const inputValue = getFormData(FORM_SETTINGS, NICKNAME);

		if (!validateName(inputValue)) {
			hideElement(COMPLETE_SETTINGS);
			showElement(ERROR_SETTINGS);
			return;
		}
		const isSuccess = await changeNameRequest(inputValue);

		if (isSuccess) {
			Cookies.set(NICKNAME, inputValue);
			hideElement(ERROR_SETTINGS);
			showElement(COMPLETE_SETTINGS);
		}
	} catch (error) {
		console.error(error.message);
		showElement(ERROR_SETTINGS);
	}
}
