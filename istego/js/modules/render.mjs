import { UI } from './index.mjs';
import { createUiElement } from './create-favorite.mjs';

function render() {
  // получить строку из localStorage
  const savedListDataString = localStorage.getItem('myListData');

  if (savedListDataString) {
    // преобразовать строку обратно в объект
    const savedListData = JSON.parse(savedListDataString);

    UI.nowDegree.textContent = Math.round(savedListData.weatherTemp);
    UI.nowIcon.src = `https://openweathermap.org/img/wn/${savedListData.weatherIcon}@2x.png`;
    UI.nowCityName.textContent = savedListData.weatherCityName;
    UI.detailsCity.textContent = savedListData.weatherCityName;
    UI.detailsTemperature.textContent = Math.round(savedListData.weatherTemp);
    UI.detailsFeelsLike.textContent = Math.round(savedListData.weatherFeelsLike);
    UI.detailsWeather.textContent = savedListData.weatherClouds;
    UI.detailsSunrise.textContent = savedListData.weatherSunrise;
    UI.detailsSunset.textContent = savedListData.weatherSunset;

    return;
  }
}

function renderFavorites(dataFavorite) {
  const uiFavorite = document.querySelectorAll('.content-right__list-item');
  uiFavorite.forEach(item => {
        item.remove();
    })
    dataFavorite.forEach(city => {
    UI.contentRight.prepend(createUiElement(city, dataFavorite));
  })
}


export { render, renderFavorites };