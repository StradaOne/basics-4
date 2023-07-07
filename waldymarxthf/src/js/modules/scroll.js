import { DOM_ELEMENTS } from "./constants";
import { hideElement, showElement } from "./utils";

const { ANCHOR, CHAT_WINDOW } = DOM_ELEMENTS.CHAT;

export const SCROLL_HEIGHT = 100;

export function isNearBottom(element, threshold = SCROLL_HEIGHT) {
	return element.scrollHeight - (element.scrollTop + element.clientHeight) <= threshold;
}

export function handleScrollVisibility() {
	const isScrollNearBottom = isNearBottom(CHAT_WINDOW, SCROLL_HEIGHT);
	if (isScrollNearBottom) {
		hideElement(ANCHOR);
	} else {
		showElement(ANCHOR);
	}
}
