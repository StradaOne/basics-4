import { setTheme, popupAuthorization } from "./popups";
import { variables } from "./ui_variables";
import { pop } from "./ui";
import { render } from "./DOM_render";

function init() {
	setTheme();
	// render(popupAuthorization, variables.popup);
}

init();
