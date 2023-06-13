import { deleteFavorites, renderFavorites } from "../script.js";
import { getRequest } from "./api.js";
import { timeConvert, dateConvert } from "./utils.js";
import { VARIABLES } from "./variables.js";
import { saveToLocalStorage } from "./localstorage.js";

export async function updateWeather(location){
   try {
      let [dataWeather, dataForecast] = await Promise.all([
         getRequest(location, "weather"),
         getRequest(location, "forecast"),
      ]);
   updateBlockNow(dataWeather);
   updateBlockDetails(dataWeather);
   updateBlockForecast(dataForecast);
   saveToLocalStorage("LastLocation", location);
   } catch (ERROR) {
      alert(ERROR.message);
   }
}
export function updateBlockNow(data){
   const {name, main, weather} = data;

   let temp = Math.round((main.temp - 273))

   VARIABLES.NOW.nowCityName.textContent = name;
   VARIABLES.NOW.nowCityTemp.textContent = temp;
   VARIABLES.NOW.nowIcon.src = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

}

export function updateBlockDetails(data){
   const {name, main, weather, sys, timezone} = data;
   
   let temp = Math.round((main.temp - 273))
   let tempFeelsLike = Math.round((main.feels_like - 273));

   let timeSunrise = timeConvert(sys.sunrise, timezone);
   let timeSunset = timeConvert(sys.sunset, timezone);
   console.log(sys.sunrise);
   console.log(timezone);

   VARIABLES.DETAILS.detailsCity.textContent = name;
   VARIABLES.DETAILS.detailsTemp.textContent = temp;
   VARIABLES.DETAILS.detailsFeels.textContent = tempFeelsLike;
   VARIABLES.DETAILS.detailsWeather.textContent = weather[0].main;
   VARIABLES.DETAILS.detailsSunrise.textContent = timeSunrise;
   VARIABLES.DETAILS.detailsSunset.textContent = timeSunset;
}
export function updateBlockForecast(dataForecast){
   VARIABLES.FORECAST.forecastCityName.textContent = dataForecast.city.name;
   for (let i = 0; i <= 2; i++){
      const forecastBlock = createForecast(dataForecast.list[i], dataForecast.city.timezone);
      VARIABLES.FORECAST.weatherForecast.append(forecastBlock);
   }
}
export function createElement(name){
   const container = document.createElement('li');
   const span = document.createElement('span');
   const cross = document.createElement('button');

   span.textContent = name;
   cross.textContent = "x";

   span.addEventListener("click", function(){
      updateWeather(name);
   });
   cross.addEventListener("click", function(){
      deleteFavorites(name);
      renderFavorites();
   });
   container.append(span, cross);
   return  container;
}
export function createForecast(list, timezone){
   const wrapper = document.createElement("div");

   const dateTime = document.createElement("div");
   const condition = document.createElement("div");
   const feelLike = document.createElement("div");

   const date = document.createElement("p");
   const time = document.createElement("p");

   const temp = document.createElement("p");
   const precipitation = document.createElement("p");

   const feel_like = document.createElement("p");
   const icon = document.createElement("img");

   wrapper.classList.add("wrapper");
   dateTime.classList.add("dateTime");
   condition.classList.add("condition");
   feelLike.classList.add("feelLike");
   date.classList.add("date");
   time.classList.add("time");
   temp.classList.add("temp");
   precipitation.classList.add("precipitation");
   feel_like.classList.add("feel_like");
   icon.classList.add("icon");

   wrapper.append(dateTime, condition, feelLike);
   dateTime.append(date, time);
   condition.append(temp, precipitation);
   feelLike.append(feel_like, icon);
   
   date.textContent = dateConvert(list.dt, timezone);
   time.textContent = timeConvert(list.dt, timezone);

   const temperature = "Temperatute: " + Math.round(list.main.temp - 273) + "°";
   const tempFeelsLike = "Feels like: " + Math.round(list.main.feels_like-273) + "°";
   const iconUrl = `http://openweathermap.org/img/wn/${list.weather[0].icon}@2x.png`

   temp.textContent = temperature;
   precipitation.textContent = list.weather[0].main;
   feel_like.textContent = tempFeelsLike
   icon.src = iconUrl;
   return wrapper;
}

