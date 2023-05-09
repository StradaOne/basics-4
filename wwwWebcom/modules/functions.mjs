import {input,city,temperature,icon} from './constants.mjs'


export function renderInfo(data) {
	if (data) {
		city.textContent = input.value.slice(0,1).toUpperCase() + input.value.slice(1)
		temperature.textContent = `${Math.round(data.main.temp)}°`
		icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
	}
	input.value = ''
}











