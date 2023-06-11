import { saveToLocalStorage, loadFromLocalStorage } from "./localstorage.js";
import { timeConverter, dateConverter } from "./utils.js";
import { updateWeather } from "./weather.js";
import { VARIABLES } from "./ui-variables.js";
import {
	addLocation,
	deleteLocation,
	renderLocations,
	changeIcon,
} from "./locations.js";

export function createLocationElement(element) {
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

export async function updateBlockNow(data) {
	const { main, name, weather } = data;
	const tempBlockNow = Math.round(main.temp);
	const iconBlockNow = weather[0].icon;
	const iconUrl = `./assets/weather_icons/${iconBlockNow}.png`;

	VARIABLES.NOW.TEMPERATURE.textContent = tempBlockNow;
	VARIABLES.NOW.CITY.textContent = name;
	VARIABLES.NOW.ICON.src = iconUrl;
	changeIcon();
}

//* обновляет блок NOW

export async function updateBlockDetails(data) {
	const { name, main, weather, sys, timezone } = data;
	const tempBlockDetails = Math.round(main.temp);
	const feelsLikeBlockDetails = Math.round(main.feels_like);
	const weatherBlockDetails = weather[0].main;
	const sunriseBlockDetails = timeConverter(sys.sunrise, timezone);
	const sunsetBlockDetails = timeConverter(sys.sunset, timezone);

	VARIABLES.DETAILS.CITY.textContent = name;
	VARIABLES.DETAILS.TEMPERATURE.textContent = tempBlockDetails;
	VARIABLES.DETAILS.FEEL_LIKE.textContent = feelsLikeBlockDetails;
	VARIABLES.DETAILS.WEATHER.textContent = weatherBlockDetails;
	VARIABLES.DETAILS.SUNRISE.textContent = sunriseBlockDetails;
	VARIABLES.DETAILS.SUNSET.textContent = sunsetBlockDetails;
}

//* обновляет блок DETAILS

export async function updateBlockForecast(data) {
	const { city, list } = data;
	const cityBlockForecast = city.name;
	VARIABLES.FORECAST.CITY.textContent = cityBlockForecast;

	VARIABLES.FORECAST.DATE.forEach((date, index) => {
		let dateBlockForecast = dateConverter(list[index].dt);
		date.textContent = dateBlockForecast;
	});

	VARIABLES.FORECAST.TIME.forEach((date, index) => {
		let timeBlockForecast = timeConverter(list[index].dt, city.timezone);
		date.textContent = timeBlockForecast;
	});

	VARIABLES.FORECAST.TEMPERATURE.forEach((temp, index) => {
		let tempBlockForecast = Math.round(list[index].main.temp);
		temp.textContent = tempBlockForecast;
	});

	VARIABLES.FORECAST.PRECIPITATION.forEach((precipitaion, index) => {
		let precipitationBlockForecast = list[index].weather[0].main;
		precipitaion.textContent = precipitationBlockForecast;
	});

	VARIABLES.FORECAST.FEEL_LIKE.forEach((feelLike, index) => {
		let feelLikeBlockForecast = Math.round(list[index].main.feels_like);
		feelLike.textContent = feelLikeBlockForecast;
	});

	VARIABLES.FORECAST.ICON.forEach((icon, index) => {
		let iconBlockForecast = list[index].weather[0].icon;
		icon.src = `./assets/weather_icons/${iconBlockForecast}.png`;
	});
}

//* обновляет блок FORECAST

export async function initializeUI() {
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

	let savedLocation = loadFromLocalStorage("lastLocation");
	if (!savedLocation) {
		savedLocation = "Minsk";
		saveToLocalStorage("lastLocation", savedLocation);
	}
	await updateWeather(savedLocation);
	//* сохраняет последний выбранный город и загружает его

	const activeTabIndex = loadFromLocalStorage("index");
	if (activeTabIndex !== null) {
		VARIABLES.TABS.forEach((tabs) => tabs.classList.remove("active"));
		VARIABLES.WEATHER_BLOCK.forEach((w) => w.classList.remove("active"));
		VARIABLES.TABS[activeTabIndex].classList.add("active");
		VARIABLES.WEATHER_BLOCK[activeTabIndex].classList.add("active");
	} else {
		VARIABLES.TABS[0].classList.add("active");
		VARIABLES.WEATHER_BLOCK[0].classList.add("active");
	}
	//* сохраняет последний нажатый таб и загружает его

	VARIABLES.FORM.addEventListener("submit", (event) => {
		event.preventDefault();
		const inputValue = new FormData(VARIABLES.FORM).get("city");
		updateWeather(inputValue);
		VARIABLES.FORM.reset();
	});

	VARIABLES.NOW.LIKE.addEventListener("click", addLocation);

	renderLocations();
}
