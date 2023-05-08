import { ELEMENTS } from "./modules/ui_elements.js";
import { showWeatherImage } from "./modules/weather_types.js";

function roundNumber(num) {
   return parseInt(num);
}

async function render(event) {
   event.preventDefault()

   let data = await getData();
   let temperature = `${roundNumber(data.main.temp)}°`;

   ELEMENTS.TEMP.textContent = temperature;
   ELEMENTS.MAIN_CITY.textContent = data.name;
   ELEMENTS.INPUT.value = '';

   showWeatherImage(data);
}

async function getData() {
   const url = getUrl();
   const response = await fetch(url);

   if (response.ok) {
      return await response.json();
   }
   return response.status;
}

function getUrl() {
   const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
   const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
   const cityName = ELEMENTS.INPUT.value;

   return `${serverUrl}?q=${cityName}&units=metric&appid=${apiKey}`;
}

ELEMENTS.FORM.addEventListener('submit', render);