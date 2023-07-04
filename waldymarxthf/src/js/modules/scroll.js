import { DOM_ELEMENTS } from "./constants";
import { hideElement, showElement } from "./utils";

const { ANCHOR, WINDOW } = DOM_ELEMENTS.CHAT;

let lastScrollTop = 0;
const SCROLL_HEIGHT = 200;

export function handleScrollVisibility() {
	if (
		this.scrollTop < lastScrollTop &&
		this.scrollHeight - this.scrollTop - this.clientHeight >= SCROLL_HEIGHT
	) {
		showElement(ANCHOR);
	} else {
		hideElement(ANCHOR);
	}

	lastScrollTop = this.scrollTop;
}

export function scrollToEnd() {
	WINDOW.scrollIntoView({ behavior: "smooth", block: "end" });
}
