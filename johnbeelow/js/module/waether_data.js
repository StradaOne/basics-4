import { render } from './weather_render.js'
import { checkInput } from './utils_input.js'

export const API = {
  URL_SERVER: 'http://api.openweathermap.org/data/2.5/weather',
  URL_IMG: 'http://openweathermap.org/img/wn',
  IMG_SIZE_2X: '@2x.png',
  KEY: `f660a2fb1e4bad108d6160b7f58c555f`,
}

const API_LOG = {
  SERVER_COMPLETE: 'The server response is successful',
  SERVER_ERROR: 'Error loading data',
  MESSAGE_ERROR: 'Erorr',
}

export function getWeatherData(city) {
  if (!checkInput(city)) return

  const url = `${API.URL_SERVER}?q=${city}&appid=${API.KEY}`
  fetch(url)
    .then((response) => response.json())
    .then((data) => render(data))
    .catch((error) => console.error(`${API_LOG.SERVER_ERROR}: ${error}`))
}
