function getElement(selector){
    return document.querySelector(selector);
}

const form = getElement('.weather__form');
const input = getElement('.weather__input');
const temperatureNumber = getElement('.temperature__number');
const place = getElement('.tab-block__country');
const buttonAddCity = getElement('.tab-block__img');
const city = getElement('.tab-block__country');
const list = getElement('.list');
const weatherIcon = getElement('.weather__icon');
const countryTitle = getElement('.country-title');
const elementTemperature = getElement('.element-temperature');
const elementFeels = getElement('.element-feels');
const elementWeather = getElement('.element-weather');
const elementSunrise = getElement('.element-sunrise');
const elementSunset = getElement('.element-sunset');
const tabs = getElement('.tabs');
const nodeTab = document.querySelectorAll('.tab');

export {form, input, temperatureNumber, place, 
    buttonAddCity, city, list, weatherIcon, countryTitle, 
    elementTemperature, elementFeels, elementWeather,
    elementSunrise, elementSunset, tabs, nodeTab};