import {
    BUTTONS,
    DISPLAY,
    SEARCH_FORM,
    WEATHER_NOW,
    CITIES_LOCATIONS,
    WEATHER_DETAILS,
    favoriteListCities,
    currentCity
} from './assets/variables.js'

import storage from './assets/localstorage.js'
import convertTime from "./assets/utilites.mjs";

const serverUrl = 'http://api.openweathermap.org/data/2.5'
const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f'

function buttonHandler(evt) {
    evt.target.classList.add('active')
    if (evt.target === BUTTONS.NOW) {
        DISPLAY.NOW.style.display = 'block'
        BUTTONS.DETAILS.classList.remove('active')
        BUTTONS.FORECAST.classList.remove('active')
        DISPLAY.DETAILS.style.display = 'none'
        DISPLAY.FORECAST.style.display = 'none'

    }
    if (evt.target === BUTTONS.DETAILS) {
        DISPLAY.DETAILS.style.display = 'block'
        BUTTONS.NOW.classList.remove('active')
        BUTTONS.FORECAST.classList.remove('active')
        DISPLAY.NOW.style.display = 'none'
        DISPLAY.FORECAST.style.display = 'none'

    }
    if (evt.target === BUTTONS.FORECAST) {
        DISPLAY.FORECAST.style.display = 'block'
        BUTTONS.DETAILS.classList.remove('active')
        BUTTONS.NOW.classList.remove('active')
        DISPLAY.NOW.style.display = 'none'
        DISPLAY.DETAILS.style.display = 'none'

    }
}

function setWeatherDetails(data) {
    const currentWeatherDetails = {
        name: data.name,
        temperature: data.main.temp,
        feelsLike: data.main.feels_like,
        condition: data.weather[0].main,
        sunriseTime: data.sys.sunrise,
        sunsetTime: data.sys.sunset,
        timezone: data.timezone
    }
    WEATHER_DETAILS.FEELS.textContent = Math.floor(currentWeatherDetails.feelsLike) + '\u00B0'
    WEATHER_DETAILS.CITY_NAME.textContent = currentWeatherDetails.name
    WEATHER_DETAILS.TEMPERATURE.textContent = Math.floor(currentWeatherDetails.temperature) + '\u00B0'

    WEATHER_DETAILS.WEATHER_CONDITION.textContent = currentWeatherDetails.condition
    WEATHER_DETAILS.SUNSET.textContent = convertTime(currentWeatherDetails.sunsetTime, currentWeatherDetails.timezone)
    WEATHER_DETAILS.SUNRISE.textContent = convertTime(currentWeatherDetails.sunriseTime, currentWeatherDetails.timezone)
}

function setWeatherNow(data) {
    const idIcon = data.weather[0].icon
    const currentCity = {
        name: data.name,
        temperature: data.main.temp,
        iconURL: `https://openweathermap.org/img/wn/${idIcon}@2x.png`,
    }
    WEATHER_NOW.CITY.textContent = currentCity.name
    WEATHER_NOW.ICON.src = currentCity.iconURL
    WEATHER_NOW.TEMPERATURE.textContent = Math.floor(currentCity.temperature) + '\u00B0'
    storage.saveCurrentCity(currentCity.name)
}

function setWeatherForecast(data){
    data.list.forEach((el, index)=>{
        if(index > 0) {
            console.log(el, index)
        }
    })
}

function setWeather(weatherData, forecastData) {
    setWeatherNow(weatherData)
    setWeatherDetails(weatherData)
    setWeatherForecast(forecastData)
}

async function getWeather(cityName, location) {
    const url = `${serverUrl}/${location}?q=${cityName}&appid=${apiKey}&units=metric`
    try {
        let response = await fetch(url)
        if (response.ok) {
            let data = await response.json()
            return data
        } else {
            throw new Error((await response.json()).message)
        }

    } catch (error) {
        console.log(error.message)
    }


}

async function searchCity(city) {
    const cityName = city
    const weatherLink = 'weather'
    const forecastLink = 'forecast'
    const weatherData = await getWeather(cityName, weatherLink)
    const forecastData = await getWeather(cityName, forecastLink)
    setWeather(weatherData, forecastData)

}



function createListCityNode(city) {
    const listItem = document.createElement('li')
    listItem.classList.add('item-locations')
    listItem.textContent = city
    const delBtn = document.createElement('img')
    delBtn.classList.add('del-btn')
    delBtn.src = './img/icons/delete-button.svg'
    listItem.appendChild(delBtn)
    CITIES_LOCATIONS.LIST.appendChild(listItem)
}

function likeButtonHandler() {
    const favoriteCity = WEATHER_NOW.CITY.textContent
    if (favoriteListCities.length > 5) {
        favoriteListCities.shift()
    }
    favoriteListCities.push(favoriteCity)
    storage.saveFavoriteCities(favoriteListCities)

    render()

}

function listCityHandler(evt) {
    const cityItem = evt.target.textContent
    if (WEATHER_NOW.CITY.textContent !== cityItem) {
        if (evt.target.tagName === 'LI') {
            searchCity(cityItem)
        }
    }
    if (evt.target.className === 'del-btn') {
        console.log(evt.target.parentNode.textContent)
        const index = favoriteListCities.indexOf(evt.target.parentNode.textContent)
        favoriteListCities.splice(index, 1)
        storage.saveFavoriteCities(favoriteListCities)
        render()

        evt.target.parentNode.remove()
    }

}

function render() {
    CITIES_LOCATIONS.LIST.innerHTML = ''
    const favoriteCities = storage.getFavoriteCities()
    favoriteCities.forEach((city) => {
        createListCityNode(city)
    })
    const currentCity = storage.getCurrentCity()
    searchCity(currentCity)
}


SEARCH_FORM.FORM.addEventListener('submit', (evt) => {
    evt.preventDefault()
    searchCity(SEARCH_FORM.INPUT.value)
    SEARCH_FORM.FORM.reset()
})
BUTTONS.NOW.addEventListener('click', buttonHandler)
BUTTONS.DETAILS.addEventListener('click', buttonHandler)
BUTTONS.FORECAST.addEventListener('click', buttonHandler)
WEATHER_NOW.LIKE.addEventListener('click', likeButtonHandler)
CITIES_LOCATIONS.LIST.addEventListener('click', listCityHandler)


render()