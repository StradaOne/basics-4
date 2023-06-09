import convTime from './modules/converterTime';
import {
  tabs, displayItem, inputValue, formNode, nameFavCity, addButtonShape, sectionItem,
} from './modules/DOMconstants';

function clearInput() {
  inputValue.value = '';
}

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    tabs.forEach((t) => t.classList.remove('active-tab'));
    displayItem.forEach((el) => el.classList.remove('active'));

    tab.classList.add('active-tab');
    displayItem[index].classList.add('active');
  });
});

function createDisplayNow(data) {
  const tempSpan = document.querySelector('.weather-temp span');
  const temperature = data.main.temp;
  tempSpan.textContent = temperature.toFixed(0);

  const iconId = data.weather[0].icon;
  const iconImg = `https://openweathermap.org/img/wn/${iconId}@4x.png`;
  const iconWeather = document.querySelector('.weather-icon img');
  iconWeather.src = iconImg;
  const cityName = document.querySelector('.location-target span');
  cityName.textContent = data.name;
}

function createDisplayDetails(data) {
  const cityName = document.querySelector('.details-city');
  cityName.textContent = data.name;
  const sunrise = document.querySelector('.sunrise');
  const sunset = document.querySelector('.sunset');
  const weather = document.querySelector('.weather-sky');
  const feelslike = document.querySelector('.feels');
  const temperature = document.querySelector('.temperature-list');

  const sunriseValue = convTime(data.sys.sunrise, 'HH:mm');
  sunrise.textContent = sunriseValue;

  const sunsetValue = convTime(data.sys.sunset, 'HH:mm');
  sunset.textContent = sunsetValue;

  const weatherData = data.weather[0].main;
  weather.textContent = weatherData;

  const feelsLike = data.main.feels_like;
  feelslike.textContent = feelsLike;

  const tempDetails = data.main.temp;
  temperature.textContent = tempDetails.toFixed(0);
}

async function getRequest(cityName) {
  try {
    const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
    // localStorage.setItem('city', JSON.stringify(cityName));
    document.cookie = `city=${cityName}; expires=${new Date(Date.now() + 86400e3)}; path=/`;
    const apiKey = '2de34209accba46efc52dfd946a3c2b3';
    const url = `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    // console.log(data);
    createDisplayNow(data);
    createDisplayDetails(data);
    clearInput();
  } catch (Err) {
    console.error(Err.message);
  }
}

const listStorage = localStorage.getItem('array');

function getStorItem() {
  if (listStorage) {
    return JSON.parse(listStorage);
  }
  return null;
}

const array = new Set(getStorItem());

function addCity() {
  const name = nameFavCity.textContent;
  array.add({ city: name });
  localStorage.setItem('array', JSON.stringify([...array]));
  // console.log(array);
  render();
}

function deleteCity(text) {
  array.forEach((element) => {
    if (element.city === text) {
      array.delete(element);
    }
  });

  // console.log(array);
  localStorage.setItem('array', JSON.stringify([...array]));
  render();
}

async function addFavoritesCity(newElem) {
  const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
  const cityName = newElem.textContent;
  const apiKey = '2de34209accba46efc52dfd946a3c2b3';
  const url = `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`;

  const response = await fetch(url);
  const data = await response.json();
  // console.log(data);
  createDisplayNow(data);
  createDisplayDetails(data);
  clearInput();
}

function createStoreElement(sectionItem, text) {
  const newElem = document.createElement('span');
  const parent = document.createElement('li');
  newElem.classList.add('new-element');
  newElem.textContent = text;

  const closeBtn = document.createElement('button');
  closeBtn.classList.add('locations-close-btn');
  const closeImg = document.createElement('img');
  closeImg.src = '/basics-4/dkomarov/img/close.svg';

  closeBtn.appendChild(closeImg);
  parent.appendChild(newElem);
  parent.appendChild(closeBtn);
  sectionItem.appendChild(parent);

  newElem.addEventListener('click', () => {
    addFavoritesCity(newElem);
  });

  closeBtn.addEventListener('click', () => {
    deleteCity(newElem.textContent);
  });
}

function render() {
  sectionItem.innerHTML = '';
  array.forEach((element) => {
    createStoreElement(sectionItem, element.city);
  });
}

formNode.addEventListener('submit', (e) => {
  const cityNames = inputValue.value;
  e.preventDefault();
  getRequest(cityNames);
});

addButtonShape.addEventListener('click', () => {
  addCity();
  // checkShape();
});

function getCookie() {
  return document.cookie.split('; ').reduce((acc, elem) => {
    const [name, value] = elem.split('=');
    acc[name] = value;
    return acc;
  }, {});
}

const cookie = getCookie();

window.addEventListener('DOMContentLoaded', () => {
  // const currentCity = JSON.parse(localStorage.getItem('city')) || '';
  const currentCity = cookie.city;
  getRequest(currentCity);
});

render();
