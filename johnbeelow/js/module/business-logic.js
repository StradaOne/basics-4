import {
  cityFavoriteList,
  currentCity,
  isCityExist,
  addCity,
  deleteCity,
  checkInput,
  updateCurrentCity,
} from './localstorage.js'

import {
  convertKelvinToCelsius,
  convertUnixToDate,
  convertUnixToTime,
} from './utils_conversion.js'

import { API, API_LOG, ERROR } from './API.js'

import {
  UI_ELEMENTS,
  CREATE_ELEMENT,
  CLASS,
  TOGGLE_LIKE,
  animateIcon,
} from './ui_elements.js'

function handleContentLoaded() {
  repeatRequest(currentCity)
  cityFavoriteList === ERROR.EMPTY_VALUE || renderFavorite()
}

const processingInputRequest = (input) => {
  const output = checkInput(input)
  if (!output) return
  repeatRequest(output)
}

const repeatRequest = (city) => {
  getWeatherData(city)
  getForecastData(city)
}

function getWeatherData(city) {
  fetch(`${API.URL_SERVER}?q=${city}&appid=${API.KEY}`)
    .then((response) => {
      if (!response.ok)
        throw new Error(`${API_LOG.SERVER_ERROR}: ${response.status}`)
      return response.json()
    })
    .then((data) => renderWeather(data))
    .catch((error) => console.error(error))
}

function renderWeather({ name, main, weather, sys }) {
  const parseWeather = {
    temperature: convertKelvinToCelsius(main.temp),
    feelsLike: convertKelvinToCelsius(main.feels_like),
    weather: weather[0].icon,
    info: weather[0].main,
    sunrise: convertUnixToTime(sys.sunrise),
    sunset: convertUnixToTime(sys.sunset),
  }

  updateTemperature(parseWeather)
  updateWeatherData(parseWeather)
  updateCurrentCity(name)
  checkLikeDisplay(name)
  updateCityList(name)
}

const updateTemperature = ({ feelsLike, temperature }) => {
  UI_ELEMENTS.FEELS_LIKE.textContent = feelsLike
  UI_ELEMENTS.TEMPERATURE.forEach((element) =>
    element.classList.contains(CLASS.TEMPERATURE)
      ? (element.textContent = temperature)
      : null
  )
}

const updateWeatherData = ({ weather, info, sunrise, sunset }) => {
  const img = `${API.URL_IMG}/${weather}${API.IMG_SIZE_2X}`
  UI_ELEMENTS.NOW_WEATHER_ICON.src = img
  UI_ELEMENTS.DETAILS_WEATHER.textContent = info
  UI_ELEMENTS.DETAILS_SUNRISE.textContent = sunrise
  UI_ELEMENTS.DETAILS_SUNSET.textContent = sunset
}

const checkLikeDisplay = (name) => {
  isCityExist(name) ? TOGGLE_LIKE.ACTIVE() : TOGGLE_LIKE.INACTIVE()
}

const updateCityList = (name) => {
  UI_ELEMENTS.ACTIVE_CITY.forEach((element) => {
    element.textContent = name
  })
}

function getForecastData() {}

function getToggleLikeAction() {
  if (UI_ELEMENTS.LIKE.classList.contains(CLASS.ACTIVE_LIKE)) {
    deleteCity(currentCity)
    checkLikeDisplay(currentCity)
    renderFavorite()
    return
  }

  if (!UI_ELEMENTS.LIKE.classList.contains(CLASS.ACTIVE_LIKE)) {
    addCity(currentCity)
    checkLikeDisplay(currentCity)
    renderFavorite()
    return
  }
}

const renderFavorite = () => {
  UI_ELEMENTS.FAVORITES_LIST.replaceChildren()
  cityFavoriteList.forEach((city) => createFavoriteCity(city.name))
}

function createFavoriteCity(name) {
  const containerCity = CREATE_ELEMENT.DIV()
  const cityName = CREATE_ELEMENT.A()
  const deleteButton = CREATE_ELEMENT.BUTTON()
  const whiteSpace = CREATE_ELEMENT.SPAN()

  cityName.textContent = name
  cityName.className = CLASS.CITY_INACTIVE
  whiteSpace.textContent = ' '
  deleteButton.textContent = '✖'
  deleteButton.className = CLASS.DELETE_CITY

  UI_ELEMENTS.FAVORITES_LIST.append(containerCity)
  containerCity.append(cityName)
  containerCity.append(whiteSpace)
  containerCity.append(deleteButton)

  cityName.addEventListener('click', () => {
    repeatRequest(name)
    animateIcon()
    renderFavorite()
  })

  deleteButton.addEventListener('click', () => {
    deleteCity(name)
    checkLikeDisplay(name)
    renderFavorite()
  })
}

function changeActiveButton(event) {
  const buttonClicked = event.target
  UI_ELEMENTS.BUTTONS_ALL.forEach((button) =>
    button === buttonClicked
      ? button.classList.add(CLASS.ACTIVE_BUTTON)
      : button.classList.remove(CLASS.ACTIVE_BUTTON)
  )
  changeTabView(buttonClicked.dataset.tab)
}

function changeTabView(tabButton) {
  for (const element of UI_ELEMENTS.TABS) {
    element.classList.remove(CLASS.ACTIVE_TAB)
    element.classList.add(CLASS.INACTIVE_TAB)
    if (element.dataset.tab === tabButton) {
      element.classList.add(CLASS.ACTIVE_TAB)
      element.classList.remove(CLASS.INACTIVE_TAB)
    }
  }
}

export {
  handleContentLoaded,
  processingInputRequest,
  repeatRequest,
  getToggleLikeAction,
  renderFavorite,
  changeActiveButton,
}
