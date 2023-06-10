import {
	searchForm,
	searchInput,
	nowTemperature,
	nowCityName,
	nowIcon,
	likeButton,
	addedLocationsList,
	tabs,
	screens,
	detailsTitle,
	detailsTemperature,
	detailsFeels,
	detailsWeather,
	detailsSunrise,
	detailsSunset,
	forecastTitle,
	forecastDate,
	forecastTime,
	forecastTemperature,
	forecastFeels,
	forecastWeather,
	forecastIcon,
} from "./ui-elements.js";

import { saveLocation, loadLocations, saveLastLocation, loadLastLocation } from "./localstorage.js";

import { timeConverter } from "./time-converter.js";

const forecastUrl = "http://api.openweathermap.org/data/2.5/forecast";
const serverUrl = "http://api.openweathermap.org/data/2.5/weather";
const apiKey = "f660a2fb1e4bad108d6160b7f58c555f";

tabs.forEach((tab, index) => {
	tab.addEventListener("click", () => {
		tabs.forEach((item) => item.classList.remove("active"));
		screens.forEach((item) => item.classList.remove("active-screen"));

		tab.classList.add("active");
		screens[index].classList.add("active-screen");
	});
});

const locations = new Set();

function addLocation() {
	try {
		if (locations.has((item) => item === nowCityName.textContent)) {
			throw new Error("Such a city has already been added");
		}

		locations.add(nowCityName.textContent);
		// console.log(locations)
		saveLocation(locations);
		renderAddedLocations();
	} catch (error) {
		alert(error);
	}
}

function createAddedLocations(item) {
	const newLocation = document.createElement("li");
	const newLocationName = document.createElement("button");
	newLocationName.classList.add("newLocationName");
	newLocationName.textContent = item;

	const deleteButton = document.createElement("button");
	const deleteButtonIcon = document.createElement("img");
	deleteButtonIcon.src = "https://img.icons8.com/?size=512&id=46&format=png";

	deleteButton.append(deleteButtonIcon);
	newLocation.append(newLocationName);
	newLocation.append(deleteButton);
	addedLocationsList.append(newLocation);

	deleteButton.addEventListener("click", () => {
		// const index = locations.findIndex((item) => item === newLocation.textContent);
		// locations.splice(index, 1);
		locations.delete(newLocation.textContent);
		// console.log(locations)
		saveLocation(locations);
		renderAddedLocations();
	});

	newLocationName.addEventListener("click", () => {
		updateWeather(item);
	});
}

function renderAddedLocations() {
	addedLocationsList.innerHTML = "";
	locations.forEach((element) => {
		createAddedLocations(element);
	});
}

async function getForecast(location) {
	const url = `${forecastUrl}?q=${location}&appid=${apiKey}&units=metric`;
	const response = await fetch(url);

	if (!response.ok) {
		throw new Error((await response.json()).message);
	} else {
		const data = await response.json();
		// console.log(data)
		return data;
	}
}

async function getWeather(location) {
	try {
		const url = `${serverUrl}?q=${location}&appid=${apiKey}&units=metric`;
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error((await response.json()).message);
		} else {
			const data = await response.json();
			// console.log(data)
			return data;
		}
	} catch (error) {
		alert(error.message);
		// console.log(error.message);
	}
}

async function updateNow(data) {
	if (!data) {
		throw new Error("No such city has been found");
	}

	nowTemperature.textContent = `${Math.round(data.main.temp)}°`;
	nowCityName.textContent = data.name;
	nowIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
}

async function updateDetails(data) {
	if (!data) {
		throw new Error("No such city has been found");
	}

	detailsTitle.textContent = data.name;
	detailsTemperature.textContent = Math.round(data.main.temp);
	detailsFeels.textContent = Math.round(data.main.feels_like);
	detailsWeather.textContent = data.weather[0].main;
	detailsSunrise.textContent = timeConverter(data.sys.sunrise, data.timezone);
	detailsSunset.textContent = timeConverter(data.sys.sunset, data.timezone);
}

async function updateForecast(data) {
	if (!data) {
		throw new Error("No such city has been found");
	}

	forecastTitle.textContent = data.city.name;

	forecastDate.forEach((date, index) => {
		const dateForecast = new Date(data.list[index].dt * 1000);
		const convertDate = dateForecast.toLocaleString("en-GB", {
			day: "numeric",
			month: "long",
		});
		date.textContent = convertDate;
	});

	forecastTime.forEach((time, index) => {
		time.textContent = timeConverter(data.list[index].dt, data.city.timezone);
	});

	forecastTemperature.forEach((temp, index) => {
		temp.textContent = Math.round(data.list[index].main.temp);
	});

	forecastFeels.forEach((feels, index) => {
		feels.textContent = Math.round(data.list[index].main.feels_like);
	});

	forecastWeather.forEach((weather, index) => {
		weather.textContent = data.list[index].weather[0].main;
	});

	forecastIcon.forEach((icon, index) => {
		icon.src = `https://openweathermap.org/img/wn/${data.list[index].weather[0].icon}@2x.png`;
	});
}

async function updateWeather(location) {
	try {
		const city = await getWeather(location);
		const forecast = await getForecast(location);

		saveLastLocation(location);

		await updateNow(city);
		await updateDetails(city);
		await updateForecast(forecast);
	} catch (error) {
		// console.error(error)
	}
}

async function weatherHandler(event) {
	event.preventDefault();
	const cityName = searchInput.value;
	await updateWeather(cityName);
	searchInput.value = "";
}

searchForm.addEventListener("submit", weatherHandler);
likeButton.addEventListener("click", addLocation);

loadLocations(locations);

const lastLocation = loadLastLocation();
updateWeather(lastLocation);
renderAddedLocations();
