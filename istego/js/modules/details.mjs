import { UI, render } from './index.mjs';
import { serverUrl, apiKey } from './data-server.mjs';

async function getWeatherDetails() {
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

      render(weatherCityName, weatherTemp);
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

export { getWeatherDetails };
