const API = {
  URL_WEATHER: 'http://api.openweathermap.org/data/2.5/weather',
  URL_FORECAST: 'http://api.openweathermap.org/data/2.5/forecast',
  URL_IMG: 'http://openweathermap.org/img/wn',
  IMG_SIZE_2X: '@2x.png',
  KEY: `c10b7c9fa5189e53c936562e7d03f032`,
}

const API_LOG = {
  SERVER_ERROR: 'Error loading',
  NO_DATA_ERROR: 'The wrong name of the city was entered',
}

const ERROR = {
  FUNCTION: 'An error occured in the function',
  EMPTY_VALUE: '',
}

export { API, API_LOG, ERROR }
