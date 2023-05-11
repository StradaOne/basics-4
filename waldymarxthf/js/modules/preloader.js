import { VARIABLES } from "./ui-variables.js"

export function showLoader() {
	VARIABLES.PRELOADER.style.display = 'flex'
}

export function hideLoader() {
	VARIABLES.PRELOADER.style.display = 'none'
}

//* функции отображения и скрытия прелоадера