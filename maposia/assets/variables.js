function getElement(tag) {
    return document.querySelector(tag)
}

const nowBtn = getElement('.weather-now-btn')
const detailsBtn = getElement('.weather-details-btn')
const forecastBtn = getElement('.weather-forecast-btn')
const displayNow = getElement('.weather-display-now')
const displayDetails = getElement('.weather-display-details')
const displayForecast = getElement('.weather-display-forecast')
const searchForm = getElement('.form-search')
const inputSearch = getElement('.text-search')

const weatherCityNow = getElement('.weather_city')
const temperatureNow = getElement('.temperature-now')
const addBtn = getElement('.weather_like')

const listCities = getElement('.list-locations')

export {
    nowBtn,
    detailsBtn,
    forecastBtn,
    displayNow,
    displayDetails,
    displayForecast,
    searchForm,
    inputSearch,
    weatherCityNow,
    temperatureNow,
    addBtn,
    listCities
}