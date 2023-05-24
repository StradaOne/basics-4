import { UI_ELEMENTS, WEATHER } from "./variables.js";
import { updateWeatherInfo } from "./api.js";
import { isInputEmpty, findIndex, isCityExist, cleanInput } from "./utils.js";
import {
  saveFavoriteCitiesInlocalStorage,
  getFavoriteCitiesFromlocalStorage,
  saveCurrentCityInLocalStorage,
  getCurrentCityFromlocalStorage,
} from "./storage.js";

export const favoriteCities = new Set(getFavoriteCitiesFromlocalStorage());

//* функция добавения города в массив

function addFavoriteCity() {
  const favoriteCity = WEATHER.NOW.CITY_NAME.textContent;

  if(favoriteCities.has(favoriteCity)) {
    alert("Выбранный город уже добавен в избранное");
    return;
  }

  favoriteCities.add(favoriteCity)
  saveFavoriteCitiesInlocalStorage([...favoriteCities]);

  render();
}

//* функция удаления города из массива

function removeFavoriteCity(city) {
  favoriteCities.delete(city)
  console.log(favoriteCities);
  saveFavoriteCitiesInlocalStorage([...favoriteCities]);
  render();
}

//* функция создания элемента списка избранных городов

function cleateElement(city) {
  const favoriteCity = document.createElement("li");
  favoriteCity.className = "city-item";
  favoriteCity.textContent = city;

  const btnCloseCity = document.createElement("button");
  btnCloseCity.className = "close-city";
  favoriteCity.append(btnCloseCity);

  btnCloseCity.addEventListener("click", () => {
    removeFavoriteCity(city);
  } );

  favoriteCity.addEventListener("click", () => {
    updateWeatherInfo(city);
    saveCurrentCityInLocalStorage(city);
  });

  return favoriteCity;
}

//* функция рендера блока с избранными городами

function render() {
  UI_ELEMENTS.CITIES_LIST.innerHTML = '';

  const cityName = getCurrentCityFromlocalStorage();
  updateWeatherInfo(cityName)

  favoriteCities.forEach((item) => {
    const newFavoriteCity = cleateElement(item);
    UI_ELEMENTS.CITIES_LIST.append(newFavoriteCity);
  });
}

//* функция получения данных города и запуск обновления погоды

async function showWeather(event) {
  event.preventDefault();
  const city = UI_ELEMENTS.INPUT_NAME.value;

  if (isInputEmpty(city)) {
    alert("Введите название города");
    return;
  }

  updateWeatherInfo(city);
  saveCurrentCityInLocalStorage(city);
  cleanInput();
}

UI_ELEMENTS.FORM.addEventListener("submit", showWeather);
UI_ELEMENTS.BTN_FAVORITE.addEventListener("click", addFavoriteCity);

window.addEventListener("DOMContentLoaded", render);