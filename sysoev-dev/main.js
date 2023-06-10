// import { subDays, formatDistance, format } from 'date-fns';
import { UI_ELEMENTS } from './js/ui';
import { roundValue, convertDate } from './js/utils';
import { storage } from './js/storage';

let favoritesCitiesList = new Set();

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

function showWeatherData(data) {
  const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  UI_ELEMENTS.NOW_TEMP.textContent = roundValue(data.main.temp);
  UI_ELEMENTS.NOW_CITY.textContent = data.name;
  UI_ELEMENTS.NOW_ICON.setAttribute('src', iconUrl);
  UI_ELEMENTS.DETAILS_TEMP.textContent = roundValue(data.main.temp);
  UI_ELEMENTS.DETAILS_FEELS.textContent = roundValue(data.main.feels_like);
  UI_ELEMENTS.DETAILS_WEATHER.textContent = data.weather[0].main;
  UI_ELEMENTS.DETAILS_CITY.textContent = data.name;
  UI_ELEMENTS.DETAILS_SUNRISE.textContent = convertDate(data.sys.sunrise);
  UI_ELEMENTS.DETAILS_SUNSET.textContent = convertDate(data.sys.sunset);
}

function showError(error) {
  alert(error);
}

// async function getWeatherForecast(cityName) {
//   const serverUrl = 'http://api.openweathermap.org/data/2.5/forecast';
//   const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
//   const url = `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`;

//   try {
//     const response = await fetch(url);
//     if (response.ok) {
//       const result = await response.json();
//     } else {
//       throw new Error('Error');
//     }
//   } catch (error) {
//     showError(error);
//   }
// }

async function getWeatherData(cityName) {
  const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
  const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
  const url = `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      storage.saveCurrentCity(data.name);
      showWeatherData(data);
    } else {
      throw new ValidationError((await response.json()).message);
    }
  } catch (error) {
    if (error instanceof ValidationError) {
      showError(`Неверное название города: ${error.message}`);
    } else if (error instanceof SyntaxError) {
      showError(`Ошибка синтаксиса JSON: ${error.message}`);
    } else {
      showError(error);
    }
  }
}

function submitSearchFormHandler(event) {
  event.preventDefault();
  const cityName = UI_ELEMENTS.FORM_INPUT.value;
  getWeatherData(cityName);
  event.target.reset();
}

function render() {
  UI_ELEMENTS.FAVORITES_LIST.textContent = '';
  favoritesCitiesList = storage.getFavoriteCities();
  const cityName = storage.getCurrentCity();
  getWeatherData(cityName);
  favoritesCitiesList.forEach((item) => addFavoritesElement(item));
}

function addFavoritesItemInList(cityName) {
  favoritesCitiesList.add(cityName);
  console.log(favoritesCitiesList);
  storage.saveFavoriteCities(favoritesCitiesList);
  render();
}

function deleteFavoritesItem(cityName) {
  favoritesCitiesList.delete(cityName);
  storage.saveFavoriteCities(favoritesCitiesList);
  console.log(favoritesCitiesList);
  render();
}

function createFavoritesElement(cityName) {
  const item = document.createElement('li');
  const p = document.createElement('p');
  const button = document.createElement('button');

  item.classList.add('locations__item');
  p.classList.add('locations__item-text');
  button.classList.add('locations__item-button');

  p.textContent = cityName;

  item.append(p, button);

  p.addEventListener('click', () => getWeatherData(cityName));
  button.addEventListener('click', () => deleteFavoritesItem(cityName));

  return item;
}

function showFavoritesElement(element) {
  UI_ELEMENTS.FAVORITES_LIST.prepend(element);
}

function addFavoritesElement(cityName) {
  const element = createFavoritesElement(cityName);
  showFavoritesElement(element);
}

function removeActiveClass(list, index = 0) {
  if (index >= list.length) { return; }
  list[index].parentNode.classList.remove('tabs__buttons-item--active');
  removeActiveClass(list, index + 1);
}

UI_ELEMENTS.TABS.forEach((item) => {
  item.addEventListener('click', () => {
    removeActiveClass(UI_ELEMENTS.TABS);
    item.parentNode.classList.add('tabs__buttons-item--active');
  });
});

UI_ELEMENTS.LIKE_BTN.addEventListener('click', (event) => {
  const cityName = event.target.previousElementSibling.textContent;
  addFavoritesItemInList(cityName);
  event.target.classList.add('now-content__buttom-btn--active');
});

UI_ELEMENTS.SEARCH_FORM.addEventListener('submit', submitSearchFormHandler);
document.addEventListener('DOMContentLoaded', render);

// console.log(format(new Date(), "'Today is a' eeee"));
// console.log(formatDistance(subDays(new Date(), 370), new Date(), { addSuffix: true }));
