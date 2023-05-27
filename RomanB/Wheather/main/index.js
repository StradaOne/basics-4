import {loadCities, loadMainCity} from '../Components/localStorage.js';
import {addTask} from '../Components/addTask.js';
import {createCitiesBlock} from '../Components/createCitiesBlock.js';
import {handleSearch} from '../Components/handleSearch.js';
import {handleLocationsBlockClick} from "../Components/handleLocationsBlockClick.js";

const searchFormButton =document.querySelector('.search-form__button');
const mainBlockTemperature = document.querySelector('.temperature-block__value');
const mainBlockCity = document.querySelector('.main-block__city');
const locationsBlock = document.querySelector('.locations-block__locations');
const likeButton = document.querySelector('.main-block__like-button');


const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';

const cities = loadCities();
createCitiesBlock(cities);

const favoriteCity = loadMainCity();
if (favoriteCity) {
    mainBlockCity.textContent = favoriteCity.city;
    mainBlockTemperature.textContent = favoriteCity.temperature;
}

searchFormButton.addEventListener('click', handleSearch)
likeButton.addEventListener('click', () => {
    addTask(cities,mainBlockCity.textContent)
    createCitiesBlock(cities)
})

locationsBlock.addEventListener('click', handleLocationsBlockClick)















