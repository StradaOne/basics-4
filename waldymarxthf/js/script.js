import { VARIABLES } from "./modules/ui-variables.js";

VARIABLES.TABS.forEach((tab, index) => {
	tab.addEventListener("click", () => {
		VARIABLES.TABS.forEach((t) => t.classList.remove("active"));
		VARIABLES.WEATHER_BLOCK.forEach((w) => w.classList.remove("active"));

		tab.classList.add("active");
		VARIABLES.WEATHER_BLOCK[index].classList.add("active");
	});
});

const serverUrl = "http://api.openweathermap.org/data/2.5/weather";
const apiKey = "afc9f2df39f9e9e49eeb1afac7034d35";

async function getCityWeather(location) {
	try {
		let link = `${serverUrl}?q=${location}&appid=${apiKey}&units=metric`;
		let response = await fetch(link);
		if (!response.ok) {
			throw new Error("Введите корректную страну или город");
		} else {
			let data = await response.json();
			return data;
		}
	} catch (error) {
		alert(error.message);
	}
}

async function changeBlockNow(data) {
	const iconBlockNow = data.weather[0].icon;
	const tempBlockNow = Math.round(data.main.temp);
	const cityBlockNow = data.name;
	const iconUrl = `https://openweathermap.org/img/wn/${iconBlockNow}@4x.png`;
	VARIABLES.NOW.TEMPERATURE.textContent = tempBlockNow;
	VARIABLES.NOW.CITY.textContent = cityBlockNow;
	VARIABLES.NOW.ICON.src = iconUrl;
}

async function changeBlockDetails(data) {
	const cityBlockDetails = data.name;
	const tempBlockDetails = Math.round(data.main.temp);
	const feelsLikeBlockDetails = Math.round(data.main.feels_like);
	const weatherBlockDetails = data.weather[0].main;
	const sunriseDate = new Date((data.sys.sunrise + data.timezone) * 1000)
	const sunriseLocalDate = sunriseDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' });
	const sunriseBlockDetails = sunriseLocalDate
	const sunsetDate = new Date((data.sys.sunset + data.timezone) * 1000)
	const sunsetLocalDate = sunsetDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' });
	const sunsetBlockDetails = sunsetLocalDate
	VARIABLES.DETAILS.TEMPERATURE.textContent = tempBlockDetails
	VARIABLES.DETAILS.CITY.textContent = cityBlockDetails
	VARIABLES.DETAILS.FEEL_LIKE.textContent = feelsLikeBlockDetails
	VARIABLES.DETAILS.WEATHER.textContent = weatherBlockDetails
	VARIABLES.DETAILS.SUNRISE.textContent = sunriseBlockDetails
	VARIABLES.DETAILS.SUNSET.textContent = sunsetBlockDetails
}

async function updateWeather(location) {
	let cityWeatherData = await getCityWeather(location)

	await changeBlockNow(cityWeatherData)
	await changeBlockDetails(cityWeatherData)
}

function weatherHandler(event) {
	event.preventDefault();
	let cityName = new FormData(VARIABLES.FORM_ELEMENT).get("city");
	updateWeather(cityName);
	VARIABLES.FORM.reset();
}

const locations = []
const saveLocation = document.querySelector('.weather__block-content-like')
const locationBLock = document.querySelector('.list-locations')

function addLocation() {
	locations.push({
		location: VARIABLES.NOW.CITY.textContent
	})
	console.log(locations)
	renderLocations()
}

function renderLocations() {
	locationBLock.innerHTML = ''
	locations.forEach((element) => {
		const newLocation = createLocationElement(element)
		locationBLock.append(newLocation)
	})
}

function createLocationElement(element) {
	const newLocation = document.createElement('li')
	newLocation.classList.add('list-locations__item')
	newLocation.textContent = element.location


	const newLocationBtn = document.createElement('button')
	newLocationBtn.classList.add('list-locations__item-btn')
	newLocation.append(newLocationBtn)

	newLocation.addEventListener('click', () => {
		displayLocation(element.location)
	})

	newLocationBtn.addEventListener('click', (event) => {
		event.stopPropagation()
		deleteLocation(newLocation)
	})

	return newLocation
}

async function displayLocation(cityName) {
	updateWeather(cityName)
}

function deleteLocation(newLocation) {
	let index = locations.findIndex((el) => el.location === newLocation.textContent)
	locations.splice(index, 1)
	renderLocations()
}

saveLocation.addEventListener('click', addLocation)

VARIABLES.FORM.addEventListener("submit", weatherHandler);
