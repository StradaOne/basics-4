import { ELEMENTS } from "./elementsUI.js";
import { roundNumber } from "./helpers.js";
import { favorites } from "../main.js";
import { showWeatherImage } from "./weatherImage.js";
import { getTargetDay, getTargetTime } from "./utils.js";

export function showWeatherNow(data) {
   ELEMENTS.TEMP.textContent = roundNumber(data.main.temp) + '°';
   ELEMENTS.MAIN_CITY.textContent = data.name;
   ELEMENTS.FORM.reset();

   ELEMENTS.MAIN_IMG.src = showWeatherImage(data);
   likeChecked(data.name);
};

export function showWeatherDetails(data) {
   const { temp, feels_like } = data.main;
   const weather = data.weather[0].main;
   const { sunrise, sunset } = data.sys;

   ELEMENTS.DETAILS.SUNSET.textContent = getTargetTime(sunset, data.timezone);
   ELEMENTS.DETAILS.SUNRISE.textContent = getTargetTime(sunrise, data.timezone);

   ELEMENTS.DETAILS.TEMPERATURE.textContent = roundNumber(temp) + '°';
   ELEMENTS.DETAILS.FEELS_LIKE.textContent = roundNumber(feels_like) + '°';
   ELEMENTS.DETAILS.WEATHER.textContent = weather;

   ELEMENTS.MAIN_CITIES.forEach(element => {
      element.textContent = data.name;
   });
};

export function showWeatherForecast(data) {
   for (let i = 0; i < 5; i++) {
      ELEMENTS.FORECAST.DAY[i].textContent = getTargetDay(data.list[i].dt, data.city.timezone);
      ELEMENTS.FORECAST.TIME[i].textContent = getTargetTime(data.list[i].dt, data.city.timezone);
      ELEMENTS.FORECAST.TEMPERATURE[i].textContent = roundNumber(data.list[i].main.temp) + '°';
      ELEMENTS.FORECAST.FEELS_LIKE[i].textContent = roundNumber(data.list[i].main.feels_like) + '°';
      ELEMENTS.FORECAST.TYPE_WEATHER[i].textContent = data.list[i].weather[0].main;
      ELEMENTS.FORECAST.TYPE_IMG[i].style.background = `url(${showWeatherImage(data.list[i])}) no-repeat`;
      ELEMENTS.FORECAST.TYPE_IMG[i].style.backgroundSize = '99%';
   };
};

export function likeChecked(cityName) {
   if (!favorites.has(cityName)) {
      ELEMENTS.BUTTON.LIKE_BTN.classList.remove('heart');
      ELEMENTS.BUTTON.LIKE_BTN.classList.add('heart-del');
      ELEMENTS.BUTTON.SVG_COLOR.setAttribute('stroke', 'black');
      return;
   }
   ELEMENTS.BUTTON.SVG_COLOR.setAttribute('stroke', 'red')
   ELEMENTS.BUTTON.LIKE_BTN.classList.remove('heart-del');
   ELEMENTS.BUTTON.LIKE_BTN.classList.add('heart')
};