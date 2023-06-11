import { saveToLocalStorage } from "./localstorage.js";

const serverUrl = "http://api.openweathermap.org/data/2.5";
const apiKey = "afc9f2df39f9e9e49eeb1afac7034d35";

export async function getWeatherData(endpoint, location) {
	let link = `${serverUrl}/${endpoint}?q=${location}&appid=${apiKey}&units=metric`;
	let response = await fetch(link);

	if (!response.ok) {
		throw new Error("Повторите попытку позже");
	}

	saveToLocalStorage("lastLocation", location);
	return response.json();
}

//* делает запрос по нужному городу на сервер и возвращает json