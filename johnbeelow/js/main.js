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
  updateCurrentCity
} from './module/localstorage.js'

import { convertKelvinToCelsius } from './module/utils_conversion.js'

import { API, API_LOG, ERROR } from './module/data.js'

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
    updateCityList(data.name)
    checkLikeDisplay(data.name)
    updateTemperature(data.main.temp)
    updateWeatherIcon(data.weather[0].icon)
  } catch (error) {
    throw new Error(`${ERROR.FUNCTION}: ${error}`)
  }
}

function updateCityList(city) {
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

const renderFavorite = () => {
  UI_ELEMENTS.FAVORITES_LIST.replaceChildren()
  cityFavoriteList.forEach((city) => createFavoriteCity(city.name))
}

function createFavoriteCity(name) {
  const containerCity = CREATE_ELEMENT.DIV()
  const cityName = CREATE_ELEMENT.A()
  const deleteButton = CREATE_ELEMENT.BUTTON()
  const whiteSpace = CREATE_ELEMENT.SPAN()

  UI_ELEMENTS.FAVORITES_LIST.append(containerCity)
  containerCity.append(cityName)
  containerCity.append(whiteSpace)
  containerCity.append(deleteButton)

  cityName.textContent = name
  cityName.className = CLASS.CITY_INACTIVE
  whiteSpace.textContent = ' '
  deleteButton.textContent = '✖'
  deleteButton.className = CLASS.DELETE_CITY

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

function changeActiveButton(event) {
  const buttonClicked = event.target
  UI_ELEMENTS.BUTTONS_ALL.forEach((button) => {
    if (buttonClicked === button) {
      button.classList.add(CLASS.ACTIVE_BUTTON)
    }
    if (buttonClicked !== button) {
      button.classList.remove(CLASS.ACTIVE_BUTTON)
    }
  })
  changeTabView(buttonClicked)
}

function changeTabView(buttonClicked) {
  const tabButton = buttonClicked.dataset.tab

  UI_ELEMENTS.TABS.forEach((element) => {
    const tab = element.dataset.tab
    if (tab === tabButton) {
      element.classList.remove(CLASS.INACTIVE_TAB)
      element.classList.add(CLASS.ACTIVE_TAB)
    }
    if (tab !== tabButton) {
      element.classList.remove(CLASS.ACTIVE_TAB)
      element.classList.add(CLASS.INACTIVE_TAB)
    }
  })
}
