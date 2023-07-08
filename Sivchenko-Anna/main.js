import { UI_ELEMENTS, WEATHER } from "./variables.js";
import { updateWeatherInfo } from "./api.js";
import { isInputEmpty, EmptyNameError, findIndex, isCityExist, cleanInput } from "./utils.js";
import {
  saveFavoriteCitiesInlocalStorage,
  getFavoriteCitiesFromlocalStorage,
  saveCurrentCityInLocalStorage,
  getCurrentCityFromlocalStorage,
} from "./storage.js";

export let favoriteCities = [];

//* функция добавения города в массив

function addFavoriteCity() {
  const favoriteCity = WEATHER.NOW.CITY_NAME.textContent;

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
  UI_ELEMENTS.CITIES_LIST.innerHTML = '';
  favoriteCities = getFavoriteCitiesFromlocalStorage();

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

  try {
    isInputEmpty(city);
    updateWeatherInfo(city);
    saveCurrentCityInLocalStorage(city);
  } catch (error) {
    if (error instanceof EmptyNameError) {
      alert(error.message);
    } else {
      throw error;
    }
  } finally {
    cleanInput();
  }
}

UI_ELEMENTS.FORM.addEventListener("submit", showWeather);
UI_ELEMENTS.BTN_FAVORITE.addEventListener("click", addFavoriteCity);

window.addEventListener("DOMContentLoaded", render);