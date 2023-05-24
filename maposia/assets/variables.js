const FAVORITE_LIST_CITIES = JSON.parse(localStorage.getItem('favoriteCities')) || []
let CURRENT_CITY = JSON.parse(localStorage.getItem('currentCity')) || 'Укажите город'


function getElement(tag) {
    return document.querySelector(tag)
}

const BUTTONS = {
    NOW: getElement('.weather-now-btn'),
    DETAILS: getElement('.weather-details-btn'),
    FORECAST: getElement('.weather-forecast-btn')

}

const DISPLAY = {
    NOW: getElement('.weather-display-now'),
    DETAILS: getElement('.weather-display-details'),
    FORECAST: getElement('.weather-display-forecast')
}

const SEARCH_FORM = {
    FORM: getElement('.form-search'),
    INPUT: getElement('.text-search')
}

const WEATHER_NOW = {
    CITY: getElement('.weather_city'),
    TEMPERATURE: getElement('.temperature-now'),
    ICON: getElement('.weather-icon'),
    LIKE: getElement('.weather_like')
}

const CITIES_LOCATIONS = {
    LIST: getElement('.list-locations'),
    ITEM: getElement('.item-locations'),
    DELBTN: getElement('.del-btn')
}

const WEATHER_DETAILS = {
    CITY_NAME: getElement('.city-details'),
    TEMPERATURE: getElement('.performance-temperature'),
    FEELS: getElement('.performance-feels'),
    WEATHER_CONDITION: getElement('.performance-weather'),
    SUNRISE: getElement('.performance-sunrise'),
    SUNSET: getElement('.performance-sunset'),
}

const WEATHER_FORECAST = {
    CITY_NAME: getElement('.city-forecast'),
    LIST: getElement('.forecast-list'),

}

export {
    BUTTONS,
    DISPLAY,
    SEARCH_FORM,
    WEATHER_NOW,
    CITIES_LOCATIONS,
    WEATHER_DETAILS,
    WEATHER_FORECAST,
    FAVORITE_LIST_CITIES,
    CURRENT_CITY,
}