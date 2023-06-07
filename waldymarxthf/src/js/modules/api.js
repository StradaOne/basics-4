import { errorHandler, errorHandlerResponse } from "./errors.js";
import { hideLoader, showLoader } from "./preloader.js";
import { saveToLocalStorage } from "./localstorage.js";

const serverUrl = "http://api.openweathermap.org/data/2.5";
const apiKey = "afc9f2df39f9e9e49eeb1afac7034d35";

export async function getData(endpoint, location) {
	showLoader()
	let link = `${serverUrl}/${endpoint}?q=${location}&appid=${apiKey}&units=metric`;
	try {
		let response = await fetch(link);
		await errorHandlerResponse(response)
		saveToLocalStorage("lastLocation", location);
		return response.json()
	} finally {
		setTimeout(hideLoader, 250)
	}
}

//* делает запрос по нужному городу на сервер и возвращает json

export async function getWeatherData(location) {
	try {
		return await Promise.all([
			getData("forecast", location),
			getData("weather", location),
		])

	} catch (error) {
		errorHandler(error);
	}
}

//* функция которая получает данные и вызывает функции обновление блоков