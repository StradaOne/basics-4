import { ELEMENTS } from "./elementsUI.js";
import { getTargetTime } from "./utils.js";
import { findCity, roundNumber } from "./helpers.js";
import { showWeatherImage } from "./weatherImage.js";
import { setLocalStorage } from "./localStorage.js";
import { fetchDataForForecast } from "./forecast.js";

let isFetching = false;

export async function fetchData(cityName) {
   if (isFetching) {
      return;
   }
   isFetching = true;

   const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
   const apiKey = 'afc9f2df39f9e9e49eeb1afac7034d35';
   const url = `${serverUrl}?q=${cityName}&units=metric&appid=${apiKey}`;

   try {
      let response = await fetch(url)
      if (response.ok) {
         let data = await response.json();
         showWeatherNow(data);
         showWeatherDetails(data);
         fetchDataForForecast(data.name)
         setLocalStorage('lastCity', cityName);
      } else {
         throw new Error((await response.json()).message);
      }
   } catch (error) {
      alert(error);
   } finally {
      isFetching = false;
   }
};

function showWeatherNow(data) {
   ELEMENTS.TEMP.textContent = roundNumber(data.main.temp) + '°';
   ELEMENTS.MAIN_CITY.textContent = data.name;
   ELEMENTS.FORM.reset();

   ELEMENTS.MAIN_IMG.src = showWeatherImage(data);
   likeChecked(data.name);
}

function showWeatherDetails(data) {
   const { temp, feels_like } = data.main;
   const weather = data.weather[0].main;
   const { sunrise, sunset } = data.sys;

   ELEMENTS.DETAILS.SUNSET.textContent = getTargetTime(data, sunset);
   ELEMENTS.DETAILS.SUNRISE.textContent = getTargetTime(data, sunrise);

   ELEMENTS.DETAILS.TEMPERATURE.textContent = roundNumber(temp) + '°';
   ELEMENTS.DETAILS.FEELS_LIKE.textContent = roundNumber(feels_like) + '°';
   ELEMENTS.DETAILS.WEATHER.textContent = weather;

   ELEMENTS.MAIN_CITIES.forEach(element => {
      element.textContent = data.name;
   });
};

export function likeChecked(cityName) {
   if (!findCity(cityName)) {
      ELEMENTS.BUTTON.LIKE_BTN.classList.remove('heart');
      ELEMENTS.BUTTON.LIKE_BTN.classList.add('heart-del');
      ELEMENTS.BUTTON.SVG_COLOR.setAttribute('stroke', 'black');
      return;
   }
   ELEMENTS.BUTTON.SVG_COLOR.setAttribute('stroke', 'red')
   ELEMENTS.BUTTON.LIKE_BTN.classList.remove('heart-del');
   ELEMENTS.BUTTON.LIKE_BTN.classList.add('heart')
};