import { UI } from './index.mjs';

function render(cityName, temp, feelLlike, weather, sunrise, sunset) {
  UI.nowDegree.textContent = Math.round(temp);
  UI.nowCityName.textContent = cityName;
  UI.detailsCity.textContent = cityName;
  UI.detailsTemperature.textContent = Math.round(temp);
  UI.detailsFeelsLike.textContent = Math.round(feelLlike);
  UI.detailsWeather.textContent = weather;
  UI.detailsSunrise.textContent = sunrise;
  UI.detailsSunset.textContent = sunset;
}

export { render };