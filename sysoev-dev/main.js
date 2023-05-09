import { UI_ELEMENTS } from './js/ui.js';
import { roundValue } from './js/utils.js';

function showWeatherData(data) {
  const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  UI_ELEMENTS.NOW_TEMP.textContent = roundValue(data.main.temp);
  UI_ELEMENTS.NOW_CITY.textContent = data.name;
  UI_ELEMENTS.NOW_ICON.setAttribute('src', iconUrl);
}

function showError(error) {
  alert(error);
}

function getWeatherData(cityName) {
  const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
  const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
  const url = `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.message) {
        throw new Error(data.message);
      }
      return data;
    })
    .then(data => showWeatherData(data))
    .catch(error => showError(error));

  // try {
  //   let response = await fetch(url);
  //   if (response.ok) {
  //     const json = await response.json();
  //     showWeatherData(json);
  //   } else {
  //     throw new Error((await response.json()).message);
  //   }
  // } catch (error) {
  //   showError(error);
  // }
}

function submitSearchFormHandler(event) {
  event.preventDefault();
  const cityName = UI_ELEMENTS.FORM_INPUT.value;
  getWeatherData(cityName);
  event.target.reset();
}

UI_ELEMENTS.TABS.forEach(item => {
  item.addEventListener('click', event => {
    UI_ELEMENTS.TABS.forEach(item => {
      item.parentNode.classList.remove('tabs__buttons-item--active');
    });
    item.parentNode.classList.add('tabs__buttons-item--active');
  });
});

UI_ELEMENTS.SEARCH_FORM.addEventListener('submit', submitSearchFormHandler);
