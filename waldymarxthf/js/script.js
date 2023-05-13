import {
	timeConverter,
	findLocationIndex,
	errorHandler,
	dateConverter,
} from "./modules/utils.js";
import { showLoader, hideLoader } from "./modules/preloader.js";
import {
	saveToLocalStorage,
	loadFromLocalStorage,
} from "./modules/localstorage.js";
import { VARIABLES } from "./modules/ui-variables.js";

VARIABLES.TABS.forEach((tab, index) => {
	tab.addEventListener("click", () => {
		VARIABLES.TABS.forEach((t) => t.classList.remove("active"));
		VARIABLES.WEATHER_BLOCK.forEach((w) => w.classList.remove("active"));

		tab.classList.add("active");
		VARIABLES.WEATHER_BLOCK[index].classList.add("active");

		saveToLocalStorage("index", index);
	});
});

//* переключает табы

const locations = loadFromLocalStorage("newLocation") || [];

async function getCityWeather(location) {
	const serverUrl = "http://api.openweathermap.org/data/2.5/weather";
	const apiKey = "afc9f2df39f9e9e49eeb1afac7034d35";
	let link = `${serverUrl}?q=${location}&appid=${apiKey}&units=metric`;
	let response = await fetch(link);

	if (!response.ok) {
		throw new Error("Повторите попытку позже");
	} else {
		let data = await response.json();
		saveToLocalStorage("lastLocation", location);
		return data;
	}
}

async function getCityForecast(location) {
	const serverUrlForecast = "http://api.openweathermap.org/data/2.5/forecast";
	const apiKey = "afc9f2df39f9e9e49eeb1afac7034d35";
	let link = `${serverUrlForecast}?q=${location}&appid=${apiKey}&units=metric`;
	let response = await fetch(link);

	if (!response.ok) {
		throw new Error("Повторите попытку позже");
	} else {
		let data = await response.json();
		return data;
	}
}

//* отправляет запрос на сервер и скачивает json

async function updateBlockNow(data) {
	const iconBlockNow = data.weather[0].icon;
	const tempBlockNow = Math.round(data.main.temp);
	const cityBlockNow = data.name;
	const iconUrl = `https://openweathermap.org/img/wn/${iconBlockNow}@4x.png`;

	VARIABLES.NOW.TEMPERATURE.textContent = tempBlockNow;
	VARIABLES.NOW.CITY.textContent = cityBlockNow;
	VARIABLES.NOW.ICON.src = iconUrl;
}

//* обновляет блок NOW

async function updateBlockDetails(data) {
	const cityBlockDetails = data.name;
	const tempBlockDetails = Math.round(data.main.temp);
	const feelsLikeBlockDetails = Math.round(data.main.feels_like);
	const weatherBlockDetails = data.weather[0].main;
	const sunriseBlockDetails = timeConverter(data.sys.sunrise, data.timezone);
	const sunsetBlockDetails = timeConverter(data.sys.sunset, data.timezone);

	VARIABLES.DETAILS.TEMPERATURE.textContent = tempBlockDetails;
	VARIABLES.DETAILS.CITY.textContent = cityBlockDetails;
	VARIABLES.DETAILS.FEEL_LIKE.textContent = feelsLikeBlockDetails;
	VARIABLES.DETAILS.WEATHER.textContent = weatherBlockDetails;
	VARIABLES.DETAILS.SUNRISE.textContent = sunriseBlockDetails;
	VARIABLES.DETAILS.SUNSET.textContent = sunsetBlockDetails;
}

//* обновляет блок DETAILS

async function updateBlockForecast(data) {
	const cityBlockForecast = data.city.name;
	VARIABLES.FORECAST.CITY.textContent = cityBlockForecast;

	VARIABLES.FORECAST.DATE.forEach((date, index) => {
		let dateBlockForecast = dateConverter(data.list[index].dt);
		date.textContent = dateBlockForecast;
	});

	VARIABLES.FORECAST.TIME.forEach((date, index) => {
		let timeBlockForecast = timeConverter(
			data.list[index].dt,
			data.city.timezone
		);
		date.textContent = timeBlockForecast;
	});

	VARIABLES.FORECAST.TEMPERATURE.forEach((temp, index) => {
		let tempBlockForecast = Math.round(data.list[index].main.temp);
		temp.textContent = tempBlockForecast;
	});

	VARIABLES.FORECAST.PRECIPITATION.forEach((precipitaion, index) => {
		let precipitationBlockForecast = data.list[index].weather[0].main;
		precipitaion.textContent = precipitationBlockForecast;
	});

	VARIABLES.FORECAST.FEEL_LIKE.forEach((feelLike, index) => {
		let feelLikeBlockForecast = Math.round(data.list[index].main.feels_like);
		feelLike.textContent = feelLikeBlockForecast;
	});

	VARIABLES.FORECAST.ICON.forEach((icon, index) => {
		let iconBlockForecast = data.list[index].weather[0].icon;
		let iconUrl = `https://openweathermap.org/img/wn/${iconBlockForecast}@2x.png`;
		icon.src = iconUrl;
	});
}

//* обновляет блок FORECAST

async function updateWeather(location) {
	console.clear();
	showLoader();
	try {
		let [cityWeatherDataForecast, cityWeatherData] = await Promise.all([
			getCityForecast(location),
			getCityWeather(location),
		]);

		await updateBlockNow(cityWeatherData);
		await updateBlockDetails(cityWeatherData);
		await updateBlockForecast(cityWeatherDataForecast);
		VARIABLES.FORM[0].placeholder = VARIABLES.NOW.CITY.textContent
	} catch (error) {
		errorHandler(error);
	} finally {
		hideLoader();
	}
}

//* функция которая получает данные и вызывает функции обновление блоков

async function weatherHandler(event) {
	event.preventDefault();
	const cityName = new FormData(VARIABLES.FORM).get("city");
	await updateWeather(cityName);
	VARIABLES.FORM.reset();
}

//* функция для обработчика события

function addLocation() {
	try {
		const cityName = VARIABLES.NOW.CITY.textContent;

		if (locations.some((el) => el.location === cityName)) {
			throw new Error("Такой город уже добавлен");
		}

		locations.push({
			location: cityName,
		});

		saveToLocalStorage("newLocation", locations);
		renderLocations();
	} catch (error) {
		errorHandler(error);
	}
}

//* добавляет локацию в массив

function renderLocations() {
	VARIABLES.LOCATIONS.LIST.innerHTML = "";
	locations.forEach((element) => {
		const newLocation = createLocationElement(element);
		VARIABLES.LOCATIONS.LIST.append(newLocation);
	});
}

//* рендерит локации из массива

function createLocationElement(element) {
	const newLocation = document.createElement("li");
	newLocation.classList.add("list-locations__item");
	newLocation.textContent = element.location;

	const newLocationBtn = document.createElement("button");
	newLocationBtn.classList.add("list-locations__item-btn");
	newLocation.append(newLocationBtn);

	newLocation.addEventListener("click", () => {
		updateWeather(element.location);
	});

	newLocationBtn.addEventListener("click", (event) => {
		event.stopPropagation();
		deleteLocation(newLocation);
	});

	return newLocation;
}

//* создает элементы локации

function deleteLocation(newLocation) {
	const index = findLocationIndex(locations, newLocation);
	locations.splice(index, 1);
	saveToLocalStorage("newLocation", locations);
	renderLocations();
}

//* функция удаления локации

addEventListener("DOMContentLoaded", async () => {
	let savedLocation = loadFromLocalStorage("lastLocation");
	if (!savedLocation) {
		savedLocation = "Minsk";
		saveToLocalStorage("lastLocation", savedLocation);
	}

	const activeTabIndex = loadFromLocalStorage("index");
	if (!activeTabIndex) {
		VARIABLES.TABS[0].classList.add("active");
		VARIABLES.WEATHER_BLOCK[0].classList.add("active");
	} else {
		VARIABLES.TABS[activeTabIndex].classList.add("active");
		VARIABLES.WEATHER_BLOCK[activeTabIndex].classList.add("active");
	}

	await updateWeather(savedLocation);
});

VARIABLES.NOW.LIKE.addEventListener("click", addLocation);

VARIABLES.FORM.addEventListener("submit", weatherHandler);

renderLocations();