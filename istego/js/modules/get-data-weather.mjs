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
      render(dataGeneration(weatherData));
      UI.preload.style.display = 'none';
    } 
    else if(weatherData.cod === '404') {
      UI.findInp.value = '';
      alert('Город не найден');
      UI.preload.style.display = 'none';
    }
  } catch (error) {
    alert('Произошла ошибка');
    console.log('Error: ' + error.message);
    UI.preload.style.display = 'none';
  }

}

function dataGeneration(weatherData) {
  // Извлечение времени из объекта JSON
  const sunriseTime = new Date(weatherData.sys.sunrise * 1000);
  const sunsetTime = new Date(weatherData.sys.sunset * 1000);

  const listData = {
    weatherCityName: weatherData.name,
    weatherIcon: weatherData.weather[0].icon,
    weatherTemp: weatherData.main.temp,
    weatherFeelsLike: weatherData.main.feels_like,
    weatherClouds: weatherData.weather[0].main,
    weatherSunrise: sunriseTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    weatherSunset: sunsetTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  // преобразовать объект в строку JSON
  const listDataString = JSON.stringify(listData);

  // сохранить строку в localStorage под именем 'myListData'
  localStorage.setItem('myListData', listDataString);
}

async function getWeatherFavorite(cityName) {
  const url = `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`;

  try {
    UI.preload.style.display = 'flex';
    const response = await fetch(url);
    const weatherData = await response.json();

    if (weatherData.cod === 200) {
      UI.findInp.value = '';
      render(dataGeneration(weatherData));
      UI.preload.style.display = 'none';
    } 
    else if(weatherData.cod === '404') {
      UI.findInp.value = '';
      alert('Город не найден');
      UI.preload.style.display = 'none';
    }
  } catch (error) {
    alert('Произошла ошибка');
    console.log('Error: ' + error.message);
    UI.preload.style.display = 'none';
  }
}

export { getWeather, getWeatherFavorite };