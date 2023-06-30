import { variables } from "./ui_variables";
import { saveToLocalStorage, loadFromLocalStorage } from "./utiles";

let theme = loadFromLocalStorage("chatAppTheme") || "light";

export function changeTheme() {
	theme = theme === "light" ? "dark" : "light";
	document.documentElement.setAttribute("data-theme", theme);
	variables.popup.style.display = "none";
	saveToLocalStorage("chatAppTheme", theme);
}

export function setTheme() {
	if (theme === "dark") {
		variables.themeBtn.checked = true;
	}
	document.documentElement.setAttribute("data-theme", theme);
}

const popupAreaHandler = (e) => {
	if (e.target === variables.popup) {
		variables.popup.style.display = "none";
	}
};

const settingsBtnHandler = () => {
	variables.popup.style.display = "flex";
	variables.popup.addEventListener("click", popupAreaHandler);
};

variables.settingsBtn.addEventListener("click", settingsBtnHandler);

const popupCloseBtnHandler = () => {
	variables.popup.style.display = "none";
};

variables.popupCloseBtn.addEventListener("click", popupCloseBtnHandler);

const themeBtnHandler = (e) => {
	changeTheme(e.target);
};

variables.themeBtn.addEventListener("click", themeBtnHandler);
