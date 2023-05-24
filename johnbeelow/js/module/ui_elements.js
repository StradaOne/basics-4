const UI_ELEMENTS = {
  TABS: document.querySelectorAll('.tab'),
  BUTTONS_ALL: document.querySelectorAll('.tab-btn'),
  INPUT_FORM: document.querySelector('.search-form'),
  INPUT_TEXT: document.querySelector('.search'),
  TEMPERATURE: document.querySelectorAll('.temperature'),
  ACTIVE_CITY: document.querySelectorAll('[class*="active-city"]'),
  ACTIVE_ADDED_CITY: document.querySelector('.active-city'),
  NOW_WEATHER_ICON: document.querySelector('.icon'),
  LIKE: document.querySelector('.like'),
  FAVORITES_LIST: document.querySelector('.city-list-wrapper'),
  DELETE_CITY: document.querySelector('.delete_city'),
  ICON: document.querySelector('.icon'),
  LOADER: document.querySelector('#loader'),
  LOADER_DISCONECTED: document.querySelector('#loader-disconected'),
  FEELS_LIKE: document.querySelector('.feels-like'),
  DETAILS_WEATHER: document.querySelector('.current-state'),
  DETAILS_SUNRISE: document.querySelector('.time-sunrise'),
  DETAILS_SUNSET: document.querySelector('.time-sunset'),
  FORECAST_TAB_LIST: document.querySelector('.tab-list-forecast'),
}

const CLASS = {
  ACTIVE_BUTTON: 'active-btn',
  ACTIVE_TAB: 'active-tab',
  ACTIVE_CITY: 'active-city',
  ACTIVE_LIKE: 'like-active',
  INACTIVE_TAB: 'inactive-tab',
  INACTIVE_LIKE: 'like',
  TEMPERATURE: 'temperature',
  CITY_INACTIVE: 'view_city_deactive',
  CITY_ACTIVE: 'view_city_active',
  DELETE_CITY: 'delete_city',
  FORECAST_BLOCK: 'forecast-block',
  FORECAST_DATE: 'forecast-date',
  FORECAST_TIME: 'forecast-time',
  FORECAST_TEMPERATURE: 'forecast-temperature',
  FORECAST_WEATHER: 'forecast-state',
  FORECAST_FEELS_LIKE: 'forecast-feels-like',
  FORECAST_IMG: 'icon-item',
}

const CREATE_ELEMENT = {
  DIV: () => {
    return document.createElement('div')
  },
  P: () => {
    return document.createElement('p')
  },
  SPAN: () => {
    return document.createElement('span')
  },
  IMG: () => {
    return document.createElement('img')
  },
  BUTTON: () => {
    return document.createElement('button')
  },
  A: () => {
    return document.createElement('a')
  },
}

const TOGGLE_LIKE = {
  ACTIVE: () => {
    UI_ELEMENTS.LIKE.classList.remove(CLASS.INACTIVE_LIKE)
    UI_ELEMENTS.LIKE.classList.add(CLASS.ACTIVE_LIKE)
  },
  INACTIVE: () => {
    UI_ELEMENTS.LIKE.classList.remove(CLASS.ACTIVE_LIKE)
    UI_ELEMENTS.LIKE.classList.add(CLASS.INACTIVE_LIKE)
  },
}

const animateIcon = () => {
  UI_ELEMENTS.ICON.style.animation = 'none'
  UI_ELEMENTS.ICON.offsetHeight
  UI_ELEMENTS.ICON.style.animation = null
}

const clearInput = () => UI_ELEMENTS.INPUT_FORM.reset()

export {
  UI_ELEMENTS,
  CLASS,
  CREATE_ELEMENT,
  TOGGLE_LIKE,
  animateIcon,
  clearInput,
}
