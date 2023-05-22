const API = {
  SERVER_URL: "http://api.openweathermap.org/data/2.5/weather",
  API_KEY: "f660a2fb1e4bad108d6160b7f58c555f",
};

const form = document.querySelector(".search");
const inputName = document.querySelector(".search-input");

const cityName = document.querySelector(".city");
const temperature = document.querySelector(".temperature");
const weatherIcon = document.querySelector(".weather-icon");
const cityNameDetails = document.querySelector(".city-details");
const temperatureDetails = document.querySelector(".details-temperature");
const temperatureFeelsDetails = document.querySelector(".details-feels");
const weatherDetails = document.querySelector(".details-weather");
const sunriseDetails = document.querySelector(".details-sunrise");
const sunsetDetails = document.querySelector(".details-sunset");

const btnFavorite = document.querySelector(".city-like");
const savedCities = document.querySelector(".cities");
let favoriteCities = [];

//* функция добавения города в массив

function addFavoriteCity() {
  const favoriteCity = cityName.textContent;

  if (isInputEmpty(favoriteCity)) {
    alert("Введите название города");
    return;
  }

  if (isCityExist(favoriteCity)) {
    alert("Выбранный город уже добавен в избранное");
    return;
  }

  favoriteCities.push({ location: favoriteCity });
  saveFavoriteCitiesInlocalStorage(favoriteCities);
  render();
}

//* функция удаления города из массива

function removeFavoriteCity(city) {
  const index = findIndex(city);
  favoriteCities.splice(index, 1);
  saveFavoriteCitiesInlocalStorage(favoriteCities);
  render();
}

//* функция поиска индекса в массиве

function findIndex(name) {
  return favoriteCities.findIndex((item) => item.location === name);
}

//* функция создания элемента списка избранных городов

function cleateElement(city) {
  const favoriteCity = document.createElement("li");
  favoriteCity.className = "city-item";
  favoriteCity.textContent = city.location;

  const btnCloseCity = document.createElement("button");
  btnCloseCity.className = "close-city";
  favoriteCity.append(btnCloseCity);

  btnCloseCity.addEventListener("click", () => {
    removeFavoriteCity(city.location);
  } );

  favoriteCity.addEventListener("click", () => {
    updateWeatherInfo(city.location);
    saveCurrentCityInLocalStorage(city.location);
  });

  return favoriteCity;
}

//* функция рендера блока с избранными городами

function render() {
  savedCities.innerHTML = '';
  favoriteCities = getFavoriteCitiesFromlocalStorage();

  const cityName = getCurrentCityFromlocalStorage();
  updateWeatherInfo(cityName)

  favoriteCities.forEach((item) => {
    const newFavoriteCity = cleateElement(item);
    savedCities.append(newFavoriteCity);
  });
}

//* функция проверки на пустую строку

function isInputEmpty(name) {
  return !name.trim();
}

//* функция проверки наличия города в массиве

function isCityExist(name) {
  return favoriteCities.find((item) => item.location === name);
}

//* функция обновления данных о погоде (получение + установка)

async function updateWeatherInfo(city) {
  try{
    let cityWeather = await getWeather(city);
    setWeatherNow(cityWeather);
    setWeatherDetails(cityWeather);
  }
  catch(err) {
    console.log(err)
  }
}

// * функция получения данных погоды с API

async function getWeather(city) {
  try {
    const url = `${API.SERVER_URL}?q=${city}&appid=${API.API_KEY}&units=metric`;

    let response = await fetch(url);
    if (response.ok) {
      let data = await response.json();
      return data
    } else if (isInputEmpty(city)) {
      throw new Error("Название города не введено");
    } else {
      throw new Error((await response.json()).message);
    }
  } catch (error) {
    alert(error.message);
  }
}

// * функция установки данных погоды в раздел Now

function setWeatherNow(data) {
  temperature.textContent = `${Math.trunc(data.main.temp)}°`;
  const icon = data.weather[0].icon;
  const iconSrc = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  weatherIcon.src = iconSrc;
  cityName.textContent = data.name;
}

// * функция установки данных погоды в раздел Details

function setWeatherDetails(data) {
  cityNameDetails.textContent = data.name;
  temperatureDetails.textContent = `${Math.trunc(data.main.temp)}°`;
  temperatureFeelsDetails.textContent = `${Math.trunc(data.main.feels_like)}°`;
  weatherDetails.textContent = data.weather[0].main;
  // sunriseDetails.textContent = data.sys.sunrise;
}

// * функция очистки поля ввода города

function cleanInput() {
  form.reset();
}

//* функция получения данных города и запуск обновления погоды

async function showWeather(event) {
  event.preventDefault();
  const city = inputName.value;
  updateWeatherInfo(city);
  saveCurrentCityInLocalStorage(city);
  cleanInput();
}

//* функция сохранения списка городов в localStorage

function saveFavoriteCitiesInlocalStorage(cities) {
  const cityList = JSON.stringify(cities);
  localStorage.setItem("favoriteCities", cityList);
}

//* функция получения списка городов из localStorage

function getFavoriteCitiesFromlocalStorage() {
  const cityList = localStorage.getItem("favoriteCities");
  const result = JSON.parse(cityList);
  return result || [];
}

//* функция сохранения актуального города в localStorage

function saveCurrentCityInLocalStorage(cityName) {
  localStorage.setItem("currentCity", cityName);
}

//* функция получения актуального города в localStorage

function getCurrentCityFromlocalStorage() {
  return localStorage.getItem("currentCity") || "Vladivostok";
}

form.addEventListener("submit", showWeather);
btnFavorite.addEventListener("click", addFavoriteCity);
document.addEventListener("DOMContentLoaded", render);