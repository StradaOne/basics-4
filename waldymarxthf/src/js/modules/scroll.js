import { DOM_ELEMENTS } from "./constants";
import { hideElement, showElement } from "./utils";

const { ANCHOR } = DOM_ELEMENTS.CHAT;

const SCROLL_HEIGHT = 200;

export function handleScrollVisibility() {
	const isScrollNearBottom =
		this.scrollHeight - (this.scrollTop + this.clientHeight) > SCROLL_HEIGHT;
	if (isScrollNearBottom) {
		showElement(ANCHOR);
	} else {
		hideElement(ANCHOR);
	}
}
