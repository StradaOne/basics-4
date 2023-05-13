import {
  UI_ELEMENTS,
  CLASS,
  CREATE_ELEMENT,
  clearInput,
  TOGGLE_LIKE,
  animateIcon,
} from './module/ui_elements.js'

import {
  cityFavoriteList,
  currentCity,
  isCityExist,
  addCity,
  deleteCity,
  checkInput,
  updateCurrentCity,
} from './module/localstorage.js'

import {
  convertKelvinToCelsius,
  convertUnixToDate,
  convertUnixToTime,
} from './module/utils_conversion.js'

import { API, API_LOG, ERROR } from './module/data.js'

document.onreadystatechange = function () {
  if (document.readyState === 'complete') {
    setTimeout(function () {
      UI_ELEMENTS.LOADER.style.display = 'none'
    }, 1000)
  }
}

window.addEventListener('online', function () {
  UI_ELEMENTS.LOADER.style.display = 'none'
})

window.addEventListener('offline', function () {
  UI_ELEMENTS.LOADER.style.display = 'flex'
})

for (let button of UI_ELEMENTS.BUTTONS_ALL) {
  button.addEventListener('click', changeActiveButton)
}

document.addEventListener('DOMContentLoaded', handleContentLoaded)

UI_ELEMENTS.INPUT_FORM.addEventListener('submit', (event) => {
  event.preventDefault()
  processingInputRequest(UI_ELEMENTS.INPUT_TEXT.value)
  animateIcon()
  clearInput()
})

UI_ELEMENTS.LIKE.addEventListener('click', (event) => {
  event.preventDefault()
  getToggleLikeAction()
})

function handleContentLoaded() {
  repeatRequest(currentCity)
  cityFavoriteList === ERROR.EMPTY_VALUE || renderFavorite()
}

function processingInputRequest(input) {
  const output = checkInput(input)
  if (!output) return
  repeatRequest(output)
}

const repeatRequest = (city) => {
  getWeatherData(city)
  // getForecastData(city);
}

function getWeatherData(city) {
  const url = `${API.URL_SERVER}?q=${city}&appid=${API.KEY}`
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${API_LOG.SERVER_ERROR}: ${response.status}`)
      }
      return response.json()
    })
    .then((data) => render(data))
    .catch((error) => console.error(error))
}

function render(data) {
  try {
    updateCurrentCity(data.name)
    update.cityList(data.name)
    update.temperature(data.main.temp)
    update.weatherIcon(data.weather[0].icon)
    update.feelsLike(data.main.feels_like)
    update.weatherInfo(data.weather[0].main)
    update.sunrise(data.sys.sunrise)
    update.sunset(data.sys.sunset)
    checkLikeDisplay(data.name)
  } catch (error) {
    throw new Error(`${ERROR.FUNCTION}: ${error}`)
  }
}

const update = {
  cityList: (city) => {
    UI_ELEMENTS.ACTIVE_CITY.forEach((element) => {
      element.textContent = city
    })
  },

  temperature: (temperature) => {
    UI_ELEMENTS.TEMPERATURE.forEach((element) => {
      if (element.classList.contains(CLASS.TEMPERATURE)) {
        element.textContent = convertKelvinToCelsius(temperature)
      }
    })
  },

  weatherIcon: (icon) => {
    UI_ELEMENTS.NOW_WEATHER_ICON.src = `${API.URL_IMG}/${icon}${API.IMG_SIZE_2X}`
  },

  feelsLike: (temperature) => {
    UI_ELEMENTS.FEELS_LIKE.textContent = convertKelvinToCelsius(temperature)
  },

  weatherInfo: (weather) => {
    UI_ELEMENTS.DETAILS_WEATHER.textContent = weather
  },

  sunrise: (time) => {
    UI_ELEMENTS.DETAILS_SUNRISE.textContent = convertUnixToTime(time)
  },

  sunset: (time) => {
    UI_ELEMENTS.DETAILS_SUNSET.textContent = convertUnixToTime(time)
  },
}

const checkLikeDisplay = (name) => {
  isCityExist(name) ? TOGGLE_LIKE.ACTIVE() : TOGGLE_LIKE.INACTIVE()
}

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
    renderFavorite()
    animateIcon()
  })

  deleteButton.addEventListener('click', () => {
    deleteCity(name)
    checkLikeDisplay(name)
    renderFavorite()
  })
}

function changeActiveButton(event) {
  const buttonClicked = event.target
  UI_ELEMENTS.BUTTONS_ALL.forEach((button) => {
    if (button === buttonClicked) {
      button.classList.add(CLASS.ACTIVE_BUTTON)
    } else {
      button.classList.remove(CLASS.ACTIVE_BUTTON)
    }
  })
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
