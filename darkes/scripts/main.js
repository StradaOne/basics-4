import { ELEMENTS } from "./modules/elementsUI.js"
import { setLocalStorageParse, getLocalStorage } from "./modules/localStorage.js";
import { fetchDataForForecast } from "./modules/forecast.js";
import { findCity } from "./modules/helpers.js";
import { fetchData, likeChecked } from "./modules/weather.js";

export let favorites = [];

function getNameCity(event) {
   event.preventDefault()
   let cityName = ELEMENTS.INPUT.value;
   fetchData(cityName);
}

function showCities(cityName) {
   setLocalStorageParse('favoriteCities', favorites)
   likeChecked(cityName);
   render();
}

function showEmptyFavoriteList() {
   ELEMENTS.LIKE_CITIES.insertAdjacentHTML('beforeend', `
   <li class="rigth__item">
   <p class="empty-cities">Hey, where are all your favorite cities? Looks like it's empty here.<img class="empty-img" src="./img/empty.gif"/></p>
   </li>`)
}

function addFavoriteCity() {
   const cityName = ELEMENTS.MAIN_CITY.textContent;

   if (findCity(cityName)) {
      favorites = favorites.filter(elem => elem !== cityName)
      showCities(cityName)
      return;
   };

   favorites.push(cityName);
   showCities(cityName);
};

function removeFavoriteCity(cityName, li) {
   favorites = favorites.filter(elem => elem !== cityName);
   setLocalStorageParse('favoriteCities', favorites);
   const mainCityName = ELEMENTS.MAIN_CITY.textContent;
   likeChecked(mainCityName);
   li.classList.add('del-button-show');
   setTimeout(() => {
      render()
   }, 550);
};

function createFavoriteCity(item) {
   const li = document.createElement('li');
   const showButton = document.createElement('button');
   const delButton = document.createElement('button');
   const cityName = item;

   showButton.textContent = cityName;

   li.classList.add('rigth__item');
   showButton.classList.add('show-button');
   delButton.classList.add('delete-button');
   li.append(showButton, delButton);

   showButton.addEventListener('click', () => {
      fetchData(cityName);
      fetchDataForForecast(cityName);
   });

   delButton.addEventListener('click', () => {
      removeFavoriteCity(cityName, li);
   });

   ELEMENTS.LIKE_CITIES.append(li);
};

function render() {
   favorites = getLocalStorage('favoriteCities');
   favorites = favorites ? JSON.parse(favorites) : [];

   document.querySelectorAll('.rigth__item').forEach(element => {
      element.remove();
   });

   favorites.forEach(item => {
      createFavoriteCity(item);
   });

   if (!favorites.length) {
      showEmptyFavoriteList();
   };

   setLocalStorageParse('favoriteCities', favorites);
};

ELEMENTS.FORM.addEventListener('submit', getNameCity);
ELEMENTS.BUTTON.LIKE_BTN.addEventListener('click', addFavoriteCity);

document.addEventListener('DOMContentLoaded', () => {
   const lastCity = getLocalStorage('lastCity') || 'Abu Dhabi';
   if (lastCity) {
      fetchData(lastCity);
      fetchDataForForecast(lastCity);
   }
   render();
});