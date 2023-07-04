import Cookies from "js-cookie";
import { setTheme, popupAuthorization } from "./popups";
import { variables, apiVariables } from "./ui_variables";
import { pop } from "./ui";
import { render } from "./DOM_render";

function init() {
	setTheme();
	const token = Cookies.get(apiVariables.tokenCookieName);
	if (!token) {
		render(popupAuthorization, variables.popupWindow);
		variables.popup.style.display = "flex";
	}
	variables.messagesField.scrollTop += 1e9;
}

init();
