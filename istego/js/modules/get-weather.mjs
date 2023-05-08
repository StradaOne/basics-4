import { UI, render } from './index.mjs';
import { serverUrl, apiKey } from './data-server.mjs';

async function getWeather(event) {
  event.preventDefault();
  const cityName = UI.findInp.value;
  const url = `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`;

  try {
    UI.preload.style.display = 'flex';
    const response = await fetch(url);
    const weatherData = await response.json();

    if (weatherData.cod === 200) {
      UI.findInp.value = '';
      const weatherCityName = weatherData.name;
      const weatherTemp = weatherData.main.temp;
      const weatherFeelsLike = weatherData.main.feels_like;
      const weatherClouds = weatherData.weather[0].main;
      // Извлечение времени из объекта JSON
      const sunriseTime = new Date(weatherData.sys.sunrise * 1000);
      const sunsetTime = new Date(weatherData.sys.sunset * 1000);
      // Конвертирование времени в формат чч:мм
      const weatherSunrise = sunriseTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const weatherSunset = sunsetTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      render(weatherCityName, weatherTemp, weatherFeelsLike, weatherClouds, weatherSunrise, weatherSunset);
      UI.preload.style.display = 'none';
    } else {
      UI.findInp.value = 'Произошла ошибка, повторите позже';
      UI.preload.style.display = 'none';
    }
  } catch (error) {
    console.log('ошибка');
    UI.findInp.value = 'Error: ' + error.message;
    UI.preload.style.display = 'none';
  }

}

export { getWeather };