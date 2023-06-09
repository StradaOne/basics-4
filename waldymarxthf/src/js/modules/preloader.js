import { VARIABLES } from "./ui-variables";

export function showLoader() {
	VARIABLES.WEATHER.style.filter = "blur(1.5rem)";
	VARIABLES.PRELOADER.style.display = "flex";
}

export function hideLoader() {
	VARIABLES.WEATHER.style.filter = "none";
	VARIABLES.PRELOADER.style.display = "none";
}

//* функции отображения и скрытия прелоадера
