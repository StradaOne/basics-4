import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import { VARIABLE_UI } from "./modules/constants.mjs";
import {
  loadFromLocalStorage,
  saveLocationToLocalStorage,
} from "./modules/localstorage.mjs";

//-------------------------------------------------------------------------------------
let listOfCities = [];
let uniqueCities = [];

let countId = 0;

//-------------------------------------------------------------------------------------
VARIABLE_UI.NOW.tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    for (const el of VARIABLE_UI.NOW.tabs) el.classList.remove("active");
    for (const window of VARIABLE_UI.NOW.windows)
      window.classList.remove("active");
    VARIABLE_UI.NOW.tabs[index].classList.add("active");
    VARIABLE_UI.NOW.windows[index].classList.add("active");
  });
});

function inputReset() {
  VARIABLE_UI.NOW.input.value = "";
}

// ---------------------------------------------GET-DATA----------------------------------------

async function getData(nameEndPoint, name) {
  const cityName = name;
  const apiKey = "f660a2fb1e4bad108d6160b7f58c555f";
  const serverUrl = "http://api.openweathermap.org/data/2.5";
  const endPoint = nameEndPoint;
  const response = await fetch(
    `${serverUrl}/${endPoint}?q=${cityName}&appid=${apiKey}&units=metric`
  );
  const data = await response.json();

  if (!response.ok) throw new Error("Такого города не существует");

  saveLocationToLocalStorage("lastLocation", cityName);
  return data;
}

// ---------------------------------------<Time and Date converters>----------------------------------------------

function timeConverter(time, timezone = 0) {
  const newDate = new Date((time + timezone) * 1000);
  const localTime = utcToZonedTime(newDate, "UTC");
  const dateFormat = format(localTime, "HH:mm");
  return dateFormat;
}

function dateConverter(date, timezone) {
  const newDate = new Date((date + timezone) * 1000);
  const localDate = utcToZonedTime(newDate, "UTC");
  const dateFormat = format(localDate, "HH:mm");
  return dateFormat;
}
// ---------------------------------------<Render-functions>----------------------------------------------
function renderInfoNow(data) {
  const { main, name, weather } = data;
  VARIABLE_UI.NOW.city.textContent = name;
  VARIABLE_UI.NOW.temperature.textContent = `${Math.round(main.temp)}°`;
  VARIABLE_UI.NOW.icon.src = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
}

function renderInfoDetails(data) {
  const { name, main, weather, sys, timezone } = data;
  VARIABLE_UI.DETAILS.city.textContent = name;
  VARIABLE_UI.DETAILS.temperature.textContent = `${Math.round(main.temp)}`;
  VARIABLE_UI.DETAILS.feels.textContent = `${Math.round(main.feels_like)}`;
  VARIABLE_UI.DETAILS.weather.textContent = weather[0].main;
  VARIABLE_UI.DETAILS.sunrise.textContent = timeConverter(
    sys.sunrise,
    timezone
  );
  VARIABLE_UI.DETAILS.sunset.textContent = timeConverter(sys.sunset, timezone);
}

function renderInfoForecast(data) {
  const { city, list } = data;
  VARIABLE_UI.FORECAST.city.textContent = city.name;

  VARIABLE_UI.FORECAST.date.forEach((elem, index) => {
    elem.textContent = dateConverter(list[index].dt, data.city.timezone);
  });

  VARIABLE_UI.FORECAST.time.forEach((elem, index) => {
    elem.textContent = timeConverter(list[index].dt);
  });

  VARIABLE_UI.FORECAST.temperature.forEach((elem, index) => {
    elem.textContent = `${Math.round(list[index].main.temp)}`;
  });

  VARIABLE_UI.FORECAST.feels.forEach((elem, index) => {
    elem.textContent = `${Math.round(list[index].main.feels_like)}`;
  });

  VARIABLE_UI.FORECAST.rainfall.forEach((elem, index) => {
    elem.textContent = list[index].weather[0].main;
  });

  VARIABLE_UI.FORECAST.icon.forEach((elem, index) => {
    elem.src = `https://openweathermap.org/img/wn/${list[index].weather[0].icon}@2x.png`;
  });
}

// -----------------------------------------------------------------------------------------------------------------------------
async function getInfoWeather(nameLocation) {
  try {
    return await Promise.all([
      getData("weather", nameLocation),
      getData("forecast", nameLocation),
    ]);
  } catch (error) {
    console.log(error.message);
    inputReset();
  }
}

function renderInfoWeather([weather, forecast]) {
  renderInfoNow(weather);
  renderInfoDetails(weather);
  renderInfoForecast(forecast);
}

//-------------------------------------------------------------------------------------
function getUniqueItems(arr) {
  const newSet = new Set(arr);
  const newArr = Array.from(newSet);
  return newArr;
}

function addCity() {
  listOfCities.push(VARIABLE_UI.NOW.city.textContent);
  uniqueCities = getUniqueItems(listOfCities);
  return uniqueCities;
}

function deleteCity(event) {
  const idBtn = event.target.getAttribute("id");
  uniqueCities.splice(idBtn, 1);
}

//-------------------------------------------------------------------------------------

function createEl(city) {
  const newCity = document.createElement("li");
  const closeBtn = document.createElement("button");
  closeBtn.className = "closeBtn";
  newCity.className = "item";
  closeBtn.id = `${countId++}`;
  closeBtn.name = city;

  newCity.textContent = city;
  VARIABLE_UI.NOW.favoriteList.appendChild(newCity);
  newCity.appendChild(closeBtn);

  closeBtn.addEventListener("click", (event) => {
    deleteCity(event);
    renderStorage();
  });
}

function resetDom() {
  VARIABLE_UI.NOW.favoriteList.innerHTML = "";
}

function renderStorage() {
  countId = 0;
  resetDom();
  uniqueCities.forEach((el) => createEl(el));
  saveLocationToLocalStorage("location", uniqueCities);
}

// ---------------------------------------<Events>--------------------------------------

VARIABLE_UI.NOW.form.addEventListener("submit", async (event) => {
  event.preventDefault();
  renderInfoWeather(await getInfoWeather(VARIABLE_UI.NOW.input.value));
  inputReset();
});

VARIABLE_UI.NOW.favoriteBtn.addEventListener("click", () => {
  addCity();
  renderStorage();
});

document.addEventListener("click", async (event) => {
  if (event.target.classList.contains("item")) {
    VARIABLE_UI.NOW.input.value = event.target.textContent;
    renderInfoWeather(await getInfoWeather(VARIABLE_UI.NOW.input.value));
    inputReset();
  }
});

window.addEventListener("DOMContentLoaded", async () => {
  listOfCities = loadFromLocalStorage("location") || [];
  uniqueCities = loadFromLocalStorage("location") || [];
  const lastLocation = loadFromLocalStorage("lastLocation");
  renderStorage();
  renderInfoWeather(await getInfoWeather(lastLocation));
});
