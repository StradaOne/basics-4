const tabsContainerNode = document.querySelector('.tabs');
const tabNodes = document.querySelectorAll('.tabs__item');
const tabContentNodes = document.querySelectorAll('.weather__block');
const form = document.querySelector('.weather__search-form');
const inputCityNode = document.querySelector('.weather__search-form-input');

export {tabsContainerNode, tabNodes, tabContentNodes, form, inputCityNode};

const NOW_SCREEN_NODES = {
  NOW_TEMP: document.querySelector('.weather__block-temp span'),
  NOW_CITY: document.querySelector('.weather__block-content-city'),
  NOW_ICON_WEATHER: document.querySelector('.weather__block-cloud')
}

const DETAILS_SCREEN_NODES = {
  DETAILS_CITY_NAME: document.querySelector('.weather__details-city'),
  DETAILS_TEMP: document.querySelector('.temperature'),
  DETAILS_TEMP_FEELSLIKE: document.querySelector('.feelslike'),
  DETAILS_WEATHER: document.querySelector('.weather-sky'),
  DETAILS_SUNRISE: document.querySelector('.sunrise'),
  DETAILS_SUNSET: document.querySelector('.sunset'),
}

const FORECAST_SCREEN_NODES = {
  FORECAST_CITY_NAME: document.querySelector('.weather__forecast-city')
}

export {NOW_SCREEN_NODES, DETAILS_SCREEN_NODES, FORECAST_SCREEN_NODES}

const serverURL = 'http://api.openweathermap.org/data/2.5/weather';
const apiKey = '07e9db26c719fd02fa70bc5ba6cfd907';

export {serverURL, apiKey}