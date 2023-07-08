import { API, WEATHER } from "./variables.js";
import { convertUnixTime } from "./utils.js";

// * функция получения данных погоды с API

class ErrorHandler extends Error {
    constructor(message) {
        super(message);
        this.name = 'ErrorHandler';
    }
  }

export async function getWeather(city) {
  try {
    const url = `${API.SERVER_URL}?q=${city}&appid=${API.API_KEY}&units=metric`;

    let response = await fetch(url);
    
    if (!response.ok) {
      throw new ErrorHandler("Произошла ошибка при выполнении запроса");
    }

    let data = await response.json();
    return data;
  } catch (error) {
    throw new ErrorHandler("Такого города не существует, либо произошла ошибка при ответе от сервера");
  }
}

// * функция установки данных погоды в раздел Now

export function setWeatherNow(data) {
  const { main, name, weather } = data;

  WEATHER.NOW.TEMPERATURE.textContent = `${Math.round(main.temp)}°`;
  const icon = weather[0].icon;
  const iconSrc = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  WEATHER.NOW.ICON.src = iconSrc;
  WEATHER.NOW.CITY_NAME.textContent = name;
}

// * функция установки данных погоды в раздел Details

export function setWeatherDetails(data) {
  WEATHER.DETAILS.CITY_NAME.textContent = data.name;
  WEATHER.DETAILS.TEMPERATURE.textContent = `${Math.round(data.main.temp)}°`;
  WEATHER.DETAILS.FEELS_LIKE.textContent = `${Math.round(data.main.feels_like)}°`;
  WEATHER.DETAILS.SUNRISE.textContent = convertUnixTime(
    data.sys.sunrise,
    data.timezone
  );
  WEATHER.DETAILS.SUNSET.textContent = convertUnixTime(
    data.sys.sunset,
    data.timezone
  );
}

//* функция обновления данных о погоде (получение + установка)

export async function updateWeatherInfo(city) {
  try{
    let cityWeather = await getWeather(city);
    setWeatherNow(cityWeather);
    setWeatherDetails(cityWeather);
  }
  catch(error) {
    alert(error.message);
  }
}