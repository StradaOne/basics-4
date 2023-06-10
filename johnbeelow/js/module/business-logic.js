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
} from './utils.js'

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

const handleSendingData = (input) => {
  const output = checkInput(input)
  if (!output) return
  repeatRequest(output)
}

const repeatRequest = (city) => {
  getWeatherData(city)
  getForecastData(city)
}

const getWeatherData = async (city) => {
  try {
    const response = await fetch(
      `${API.URL_WEATHER}?q=${city}&appid=${API.KEY}`
    )
    const data = await response.json()
    renderWeather(data)
  } catch (error) {
    console.error(error)
  }
}

const renderWeather = ({ weather, main, sys, name }) => {
  const data = {
    img: `${API.URL_IMG}/${weather[0].icon}${API.IMG_SIZE_2X}`,
    feelsLike: convertKelvinToCelsius(main.feels_like),
    temperature: convertKelvinToCelsius(main.temp),
    sunrise: convertUnixToTime(sys.sunrise),
    sunset: convertUnixToTime(sys.sunset),
    weather: weather[0].main,
  }

  updateTemperature(data)
  updateWeatherData(data)
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

const updateWeatherData = ({ img, weather, sunrise, sunset }) => {
  UI_ELEMENTS.NOW_WEATHER_ICON.src = img
  UI_ELEMENTS.DETAILS_WEATHER.textContent = weather
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

const getForecastData = async (city) => {
  UI_ELEMENTS.LOADER.style.display = 'flex'

  try {
    const response = await fetch(
      `${API.URL_FORECAST}?q=${city}&appid=${API.KEY}`
    )
    const data = await response.json()
    renderForecast(data)
  } catch (error) {
    console.error(error)
  } finally {
    UI_ELEMENTS.LOADER.style.display = 'none'
  }
}

// Рекурсия:

const renderForecast = ({ list }) => {
  const renderForecastBlock = (index) => {
    if (index >= list.length) return
    const element = list[index]
    const data = {
      feelsLike: convertKelvinToCelsius(element.main.feels_like),
      temperature: convertKelvinToCelsius(element.main.temp),
      img: `${API.URL_IMG}/${element.weather[0].icon}.png`,
      date: convertUnixToDate(element.dt),
      time: convertUnixToTime(element.dt),
      weather: element.weather[0].main,
    }
    createForecastBlock(data)
    renderForecastBlock(index + 1)
  }

  UI_ELEMENTS.FORECAST_TAB_LIST.replaceChildren()
  renderForecastBlock(0)
}

const createForecastBlock = ({
  date,
  time,
  temperature,
  weather,
  feelsLike,
  img,
}) => {
  const containerBlock = CREATE_ELEMENT.DIV()
  const spanDate = CREATE_ELEMENT.SPAN()
  const spanTime = CREATE_ELEMENT.SPAN()
  const spanTemperature = CREATE_ELEMENT.SPAN()
  const spanWeather = CREATE_ELEMENT.SPAN()
  const spanFeelsLike = CREATE_ELEMENT.SPAN()
  const imgIcon = CREATE_ELEMENT.IMG()

  containerBlock.className = CLASS.FORECAST_BLOCK
  spanDate.className = CLASS.FORECAST_DATE
  spanTime.className = CLASS.FORECAST_TIME
  spanTemperature.className = CLASS.FORECAST_TEMPERATURE
  spanWeather.className = CLASS.FORECAST_WEATHER
  spanFeelsLike.className = CLASS.FORECAST_FEELS_LIKE
  imgIcon.className = CLASS.FORECAST_IMG

  spanDate.textContent = date
  spanTime.textContent = time
  spanTemperature.textContent = `Temperature: ${temperature}`
  spanWeather.textContent = weather
  spanFeelsLike.textContent = `Feels like: ${feelsLike}`
  imgIcon.src = img

  UI_ELEMENTS.FORECAST_TAB_LIST.append(containerBlock)
  containerBlock.append(spanDate)
  containerBlock.append(spanTime)
  containerBlock.append(spanTemperature)
  containerBlock.append(spanWeather)
  containerBlock.append(spanFeelsLike)
  containerBlock.append(imgIcon)
}

const renderFavorite = () => {
  UI_ELEMENTS.FAVORITES_LIST.replaceChildren()
  cityFavoriteList.forEach((name) => createFavoriteCity(name))
}

const createFavoriteCity = (name) => {
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

const getToggleLikeAction = () => {
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

const changeActiveButton = (event) => {
  const buttonClicked = event.target
  UI_ELEMENTS.BUTTONS_ALL.forEach((button) =>
    button === buttonClicked
      ? button.classList.add(CLASS.ACTIVE_BUTTON)
      : button.classList.remove(CLASS.ACTIVE_BUTTON)
  )
  changeTabView(buttonClicked.dataset.tab)
}

const changeTabView = (tabButton) => {
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
  handleSendingData,
  repeatRequest,
  renderFavorite,
  getToggleLikeAction,
  changeActiveButton,
}
