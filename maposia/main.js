import {
  BUTTONS,
  CITIES_LOCATIONS,
  DISPLAY,
  SEARCH_FORM,
  WEATHER_FORECAST,
  WEATHER_DETAILS,
  WEATHER_NOW,
} from './assets/variables';

import storage from './assets/localstorage';

import { convertTime, convertDate, getUrlIcon } from './assets/utilites';

const serverUrl = 'http://api.openweathermap.org/data/2.5';
const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';

const SetArray = new Set(JSON.parse(localStorage.getItem('favoriteCities')) || []);

function buttonHandler(evt) {
  evt.target.classList.add('active');
  if (evt.target === BUTTONS.NOW) {
    DISPLAY.NOW.style.display = 'block';
    BUTTONS.DETAILS.classList.remove('active');
    BUTTONS.FORECAST.classList.remove('active');
    DISPLAY.DETAILS.style.display = 'none';
    DISPLAY.FORECAST.style.display = 'none';
  }
  if (evt.target === BUTTONS.DETAILS) {
    DISPLAY.DETAILS.style.display = 'block';
    BUTTONS.NOW.classList.remove('active');
    BUTTONS.FORECAST.classList.remove('active');
    DISPLAY.NOW.style.display = 'none';
    DISPLAY.FORECAST.style.display = 'none';
  }
  if (evt.target === BUTTONS.FORECAST) {
    DISPLAY.FORECAST.style.display = 'block';
    BUTTONS.DETAILS.classList.remove('active');
    BUTTONS.NOW.classList.remove('active');
    DISPLAY.NOW.style.display = 'none';
    DISPLAY.DETAILS.style.display = 'none';
  }
}

function setWeatherDetails(data) {
  const currentWeatherDetails = {
    name: data.name,
    temperature: data.main.temp,
    feelsLike: data.main.feels_like,
    condition: data.weather[0].main,
    sunriseTime: data.sys.sunrise,
    sunsetTime: data.sys.sunset,
    timezone: data.timezone,
  };
  WEATHER_DETAILS.FEELS.textContent = `${Math.floor(currentWeatherDetails.feelsLike)}\u00B0`;
  WEATHER_DETAILS.CITY_NAME.textContent = currentWeatherDetails.name;
  WEATHER_DETAILS.TEMPERATURE.textContent = `${Math.floor(currentWeatherDetails.temperature)}\u00B0`;

  WEATHER_DETAILS.WEATHER_CONDITION.textContent = currentWeatherDetails.condition;
  // eslint-disable-next-line max-len
  WEATHER_DETAILS.SUNSET.textContent = convertTime(currentWeatherDetails.sunsetTime, currentWeatherDetails.timezone);
  // eslint-disable-next-line max-len
  WEATHER_DETAILS.SUNRISE.textContent = convertTime(currentWeatherDetails.sunriseTime, currentWeatherDetails.timezone);
}

function setWeatherNow(data) {
  const idIcon = data.weather[0].icon;
  const currentWeather = {
    name: data.name,
    temperature: data.main.temp,
    iconURL: getUrlIcon(idIcon),
  };
  WEATHER_NOW.CITY.textContent = currentWeather.name;
  WEATHER_NOW.ICON.src = currentWeather.iconURL;
  WEATHER_NOW.TEMPERATURE.textContent = `${Math.floor(currentWeather.temperature)}\u00B0`;
  storage.saveCurrentCity(currentWeather.name);
}

function setWeatherForecast(forecastData) {
  WEATHER_FORECAST.LIST.innerHTML = '';
  WEATHER_FORECAST.CITY_NAME.textContent = storage.getCurrentCity();
  forecastData.list.forEach((el, index) => {
    if (index > 0 && index < 4) {
      const forecastItem = document.createElement('div');
      const dateTimeNode = document.createElement('div');
      const date = document.createElement('div');
      const time = document.createElement('time-forecast');
      const weatherInfoNode = document.createElement('div');
      const temperatureFeelsNode = document.createElement('div');
      const temperature = document.createElement('p');
      const feelsLike = document.createElement('p');
      const weatherType = document.createElement('div');
      const typeText = document.createElement('p');
      const imgWeather = document.createElement('img');

      forecastItem.classList.add('forecast-item');
      dateTimeNode.classList.add('time-info-forecast');
      date.classList.add('date-forecast');
      time.classList.add('time-forecast');
      weatherInfoNode.classList.add('temperature-info-forecast');
      temperatureFeelsNode.classList.add('temperature-feels-forecast');
      temperature.classList.add('temperature-forecast-text');
      feelsLike.classList.add('feels-forecast-text');
      weatherType.classList.add('weather-info-forecast');
      typeText.classList.add('weather-type-text');
      imgWeather.classList.add('weather-type-icon');

      date.textContent = convertDate(el.dt);
      time.textContent = convertTime(el.dt);
      temperature.textContent = `Temperature: ${`${Math.floor(el.main.temp)}\u00B0`}`;
      feelsLike.textContent = `Feels like: ${`${Math.floor(el.main.feels_like)}\u00B0`}`;
      typeText.textContent = el.weather[0].main;
      const idIcon = el.weather[0].icon;
      imgWeather.src = getUrlIcon(idIcon);

      dateTimeNode.appendChild(date);
      dateTimeNode.appendChild(time);
      weatherInfoNode.appendChild(temperatureFeelsNode);
      temperatureFeelsNode.appendChild(temperature);
      temperatureFeelsNode.appendChild(feelsLike);
      weatherInfoNode.appendChild(weatherType);
      weatherType.appendChild(typeText);
      weatherType.appendChild(imgWeather);
      forecastItem.appendChild(dateTimeNode);
      forecastItem.appendChild(weatherInfoNode);

      WEATHER_FORECAST.LIST.appendChild(forecastItem);
    }
  });
}

function setWeather(weatherData, forecastData) {
  setWeatherNow(weatherData);
  setWeatherDetails(weatherData);
  setWeatherForecast(forecastData);
  // console.log(weatherData)
  // console.log(forecastData)
}

// eslint-disable-next-line consistent-return
async function getWeather(cityName, location) {
  const url = `${serverUrl}/${location}?q=${cityName}&appid=${apiKey}&units=metric`;
  try {
    const response = await fetch(url);
    if (response.ok) {
      return await response.json();
    }
    throw new Error((await response.json()).message);
  } catch (error) {
    console.log(error.message);
  }
}

async function searchCity(city) {
  const cityName = city;
  const weatherLink = 'weather';
  const forecastLink = 'forecast';
  const weatherData = await getWeather(cityName, weatherLink);
  const forecastData = await getWeather(cityName, forecastLink);
  setWeather(weatherData, forecastData);
}

function createListCityNode(city) {
  const listItem = document.createElement('li');
  listItem.classList.add('item-locations');
  listItem.textContent = city;
  const delBtn = document.createElement('img');
  delBtn.classList.add('del-btn');
  delBtn.src = './img/icons/delete-button.svg';
  listItem.appendChild(delBtn);
  CITIES_LOCATIONS.LIST.appendChild(listItem);
}

function render() {
  CITIES_LOCATIONS.LIST.innerHTML = '';
  const favoriteCities = storage.getFavoriteCities();
  favoriteCities.forEach((city) => {
    createListCityNode(city);
  });
  const currentCity = storage.getCurrentCity();
  searchCity(currentCity);
}

function likeButtonHandler() {
  const favoriteCity = WEATHER_NOW.CITY.textContent;
  SetArray.add(favoriteCity);
  storage.saveFavoriteCities([...SetArray]);
  // eslint-disable-next-line no-use-before-define
  render();
}

function listCityHandler(evt) {
  const cityItem = evt.target.textContent;
  if (WEATHER_NOW.CITY.textContent !== cityItem) {
    if (evt.target.tagName === 'LI') {
      searchCity(cityItem);
    }
  }
  if (evt.target.className === 'del-btn') {
    SetArray.delete(evt.target.parentNode.textContent);
    storage.saveFavoriteCities([...SetArray]);
    render();
  }
}

SEARCH_FORM.FORM.addEventListener('submit', (evt) => {
  evt.preventDefault();
  searchCity(SEARCH_FORM.INPUT.value);
  SEARCH_FORM.FORM.reset();
});
BUTTONS.NOW.addEventListener('click', buttonHandler);
BUTTONS.DETAILS.addEventListener('click', buttonHandler);
BUTTONS.FORECAST.addEventListener('click', buttonHandler);
WEATHER_NOW.LIKE.addEventListener('click', likeButtonHandler);
CITIES_LOCATIONS.LIST.addEventListener('click', listCityHandler);

render();
