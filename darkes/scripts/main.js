import { ELEMENTS } from "./modules/elementsUI.js"
import { setLocalStorageParse, getLocalStorage } from "./modules/localStorage.js";
import { findCity } from "./modules/helpers.js";
import { likeChecked } from "./modules/weather.js";
import { fetchData } from "./modules/weatherAPI.js";

export let favorites = [];

function getNameCity(event) {
   event.preventDefault();
   let cityName = ELEMENTS.INPUT.value;
   fetchData('weather', cityName);
}

function showCities(cityName) {
   setLocalStorageParse('favoriteCities', favorites)
   likeChecked(cityName);
   render();
}

function showEmptyFavoriteList() {
   const li = document.createElement('li');
   const p = document.createElement('p');
   const img = document.createElement('img');

   li.classList.add('rigth__item');
   p.classList.add('empty-cities');
   p.textContent = "Hey, where are all your favorite cities? Looks like it's empty here.";
   img.classList.add('empty-img');
   img.src = './img/clear.png'

   p.append(img);
   li.append(p);

   ELEMENTS.LIKE_CITIES.append(li);
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
   li.classList.remove('rigth__item');
   li.classList.add('del-button-show');
   setTimeout(() => {
      render()
   }, 550);
};

function createFavoriteCity(item) {
   const li = document.createElement('li');
   const showButton = document.createElement('button');
   const delButton = document.createElement('button');

   showButton.textContent = item;

   li.classList.add('rigth__item');
   showButton.classList.add('show-button');
   delButton.classList.add('delete-button');
   li.append(showButton, delButton);

   showButton.addEventListener('click', () => {
      fetchData('forecast', item);
      fetchData('weather', item);
   });

   delButton.addEventListener('click', () => {
      removeFavoriteCity(item, li);
   });

   ELEMENTS.LIKE_CITIES.append(li);
};

function render() {
   favorites = getLocalStorage('favoriteCities');
   favorites = favorites ? JSON.parse(favorites) : [];

   document.querySelectorAll('.rigth__item').forEach(element => {
      element.remove();
   });

   document.querySelectorAll('.del-button-show').forEach(element => {
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
      fetchData('weather', lastCity);
      fetchData('forecast', lastCity);
   }
   render();
});