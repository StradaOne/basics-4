import { convertKelvinToCelsius } from './utils_conversion.js'
import { UI_ELEMENTS, CLASS } from './ui_elements.js'
import { API } from './waether_data.js'

export function render(data) {
  updateCity(data.name)
  updateTemperature(data.main.temp)
  updateWeatherIcon(data.weather[0].icon)
}

function updateCity(city) {
  UI_ELEMENTS.ACTIVE_CITY.forEach((element) => {
    element.textContent = city
  })
}

function updateTemperature(temperature) {
  UI_ELEMENTS.TEMPERATURE.forEach((element) => {
    if (element.classList.contains(CLASS.TEMPERATURE)) {
      element.textContent = convertKelvinToCelsius(temperature)
    }
  })
}

const updateWeatherIcon = (icon) =>
  (UI_ELEMENTS.NOW_WEATHER_ICON.src = `${API.URL_IMG}/${icon}${API.IMG_SIZE_2X}`)

