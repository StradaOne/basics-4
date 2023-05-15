import { ELEMENTS } from "./elementsUI.js";
import { getTargetDay, getTargetTime } from "./utils.js";
import { roundNumber } from "./helpers.js";
import { showWeatherImage } from "./weatherImage.js";

export async function fetchDataForForecast(cityName) {
   const serverUrl = "http://api.openweathermap.org/data/2.5/forecast";
   const apiKey = "afc9f2df39f9e9e49eeb1afac7034d35";
   const url = `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`;

   try {
      let response = await fetch(url)
      if (response.ok) {
         let data = await response.json();
         showWeatherForecast(data);
      } else {
         throw new Error((await response.json()).message);
      }
   } catch (error) {
      alert(error);
   }
}

function showWeatherForecast(data) {
   for (let i = 0; i < 5; i++) {
      let date = new Date(data.list[i].dt)

      ELEMENTS.FORECAST.DAY[i].textContent = getTargetDay(data, date);
      ELEMENTS.FORECAST.TIME[i].textContent = getTargetTime(data, date);
      ELEMENTS.FORECAST.TEMPERATURE[i].textContent = roundNumber(data.list[i].main.temp) + '°';
      ELEMENTS.FORECAST.FEELS_LIKE[i].textContent = roundNumber(data.list[i].main.feels_like) + '°';
      ELEMENTS.FORECAST.TYPE_WEATHER[i].textContent = data.list[i].weather[0].main;
      ELEMENTS.FORECAST.TYPE_IMG[i].style.background = `url(${showWeatherImage(data.list[i])}) no-repeat`;
      ELEMENTS.FORECAST.TYPE_IMG[i].style.backgroundSize = '99%';
   };
}
