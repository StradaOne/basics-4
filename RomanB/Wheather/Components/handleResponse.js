import {saveMainCity} from "./localStorage.js";

const mainBlockCity = document.querySelector('.main-block__city');
const temperatureBlockValue = document.querySelector('.temperature-block__value');
const temperatureSecondBlockValue = document.querySelector('.temperature-second-block__value');
const weatherBlockValue = document.querySelector('.weather-block__value');
const sunriseBlockTitle = document.querySelector('.sunrise-block__value');
const sunsetBlockValue = document.querySelector('.sunset-block__value');


export const handleResponse = (data) => {
    mainBlockCity.textContent = data.name;
    temperatureBlockValue.textContent = data.main.temp;

    temperatureSecondBlockValue.textContent = data.main.feels_like;
    weatherBlockValue.textContent = data.weather[0].description;

    const timezoneOffset = data.timezone

    const sunrise = new Date(data.sys.sunrise * 1000);
    sunrise.setSeconds(sunrise.getSeconds() + timezoneOffset);

    const hoursSunrise = sunrise.getHours();
    const minutesSunrise = sunrise.getMinutes();
    const sunriseTime = hoursSunrise.toString().padStart(2, '0') + ':' + minutesSunrise.toString().padStart(2, '0')
    sunriseBlockTitle.textContent = sunriseTime;

    const sunset = new Date(data.sys.sunset * 1000);
    const hoursSunset = sunset.getHours();
    const minutesSunset = sunset.getMinutes();
    const sunsetTime = hoursSunset.toString().padStart(2, '0') + ':' + minutesSunset.toString().padStart(2, '0')
    sunsetBlockValue.textContent = sunsetTime;

    saveMainCity(data.name, data.main.temp, data.main.feels_like, data.weather[0].description, sunriseTime, sunsetTime)
}