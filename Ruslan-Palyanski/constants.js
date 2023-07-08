function getElement(selector){
    return document.querySelector(selector);
}

function getNodeList(selector){
    return document.querySelectorAll(selector);
}

const form = getElement('.weather__form');
const input = getElement('.weather__input');
const temperatureNumber = getElement('.temperature__number');
const place = getElement('.tab-block__country');
const buttonAddCity = getElement('.tab-block__img');
const city = getElement('.tab-block__country');
const list = getElement('.list');
const weatherIcon = getElement('.weather__icon');
const countryNodeTitle = getNodeList('.country-title');
const elementTemperature = getElement('.element-temperature');
const elementFeels = getElement('.element-feels');
const elementWeather = getElement('.element-weather');
const elementSunrise = getElement('.element-sunrise');
const elementSunset = getElement('.element-sunset');
const tabs = getElement('.tabs');
const nodeTab = getNodeList('.tab');

const tab3 = getNodeList('.tab-3__block');
const tabDate = getElement('.tab-3__date');
const tabTime = getElement('.tab-3__time');
const tm = getElement('.tm-i');
const like = getElement('.like-i');
const rain = getElement('.rain');
const imgPng = getElement('.img__png');
const tabContent = getElement('.tab-3__content');

export {form, input, temperatureNumber, place, 
    buttonAddCity, city, list, weatherIcon, countryNodeTitle, 
    elementTemperature, elementFeels, elementWeather,
    elementSunrise, elementSunset, tabs, nodeTab,
    tabDate, tabTime, tm, like, rain, imgPng, tab3, tabContent};