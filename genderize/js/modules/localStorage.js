import { history, render } from "../script.js"

export function saveGenderizeToLocalStorage() {
	localStorage.setItem('paul', JSON.stringify(history))
}

export function loadPaul() {
	const pauls = JSON.parse(localStorage.getItem('paul'))
	history.push(...pauls)
	render()
}