import { DOM_ELEMENTS, PROPERTIES } from "./constants";
import { isEmpty } from "./validation";

const { INPUT, SEND_BUTTON } = DOM_ELEMENTS.CHAT;

export function toggleSendButton() {
	if (!isEmpty(INPUT.value)) {
		SEND_BUTTON.classList.remove(PROPERTIES.HIDDEN);
	} else {
		SEND_BUTTON.classList.add(PROPERTIES.HIDDEN);
	}
}
