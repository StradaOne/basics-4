import {loadCities, loadMainCity} from "../Components/localStorage.js";
import {createCitiesBlock} from '../Components/createCitiesBlock.js';
import {handleSearch} from "../Components/handleSearch.js";
import {handleLocationsBlockClick} from "../Components/handleLocationsBlockClick.js";

const mainBlockCity = document.querySelector('.main-block__city');
const temperatureBlockValue = document.querySelector('.temperature-block__value');
const temperatureSecondBlockValue = document.querySelector('.temperature-second-block__value');
const weatherBlockValue = document.querySelector('.weather-block__value');
const sunriseBlockTitle = document.querySelector('.sunrise-block__value');
const sunsetBlockValue = document.querySelector('.sunset-block__value');
const searchFormInput = document.querySelector('.search-form__input');
const searchFormButton =document.querySelector('.search-form__button');
const locationsBlock = document.querySelector('.locations-block__locations');

const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';

const cities = loadCities();
createCitiesBlock(cities);

const favoriteCity = loadMainCity();
if (favoriteCity) {
    mainBlockCity.textContent = favoriteCity.city;
    temperatureBlockValue.textContent = favoriteCity.temperature;
    temperatureSecondBlockValue.textContent = favoriteCity.temperatureSecond;
    weatherBlockValue.textContent = favoriteCity.Weather;
    sunriseBlockTitle.textContent = favoriteCity.Sunrise;
    sunsetBlockValue.textContent = favoriteCity.Sunset;
}

searchFormButton.addEventListener('click',handleSearch)
locationsBlock.addEventListener('click', handleLocationsBlockClick)
