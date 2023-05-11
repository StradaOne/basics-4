import {
    BUTTONS,
    DISPLAY,
    SEARCHFORM,
    WEATHERNOW,
    CITIESLOCATIONS
} from './assets/variables.js'

import {favoriteListCities, currentCity, storage} from './assets/localstorage.js'


function buttonHandler(evt){
    evt.target.classList.add('active')
    if(evt.target === BUTTONS.NOW){
        DISPLAY.NOW.style.display = 'block'
        BUTTONS.DETAILS.classList.remove('active')
        BUTTONS.FORECAST.classList.remove('active')
        DISPLAY.DETAILS.style.display = 'none'
        DISPLAY.FORECAST.style.display = 'none'

    }
    if(evt.target === BUTTONS.DETAILS){
        DISPLAY.DETAILS.style.display = 'block'
        BUTTONS.NOW.classList.remove('active')
        BUTTONS.FORECAST.classList.remove('active')
        DISPLAY.NOW.style.display = 'none'
        DISPLAY.NOW.style.display = 'none'

    }
    if(evt.target === BUTTONS.FORECAST){
        DISPLAY.FORECAST.style.display = 'block'
        BUTTONS.DETAILS.classList.remove('active')
        BUTTONS.NOW.classList.remove('active')
        DISPLAY.NOW.style.display = 'none'
        DISPLAY.DETAILS.style.display = 'none'

    }
}


function setWeatherNow(data){
    const idIcon = data.weather[0].icon
    const currentCity = {
        name: data.name,
        temperature: data.main.temp,
        iconURL: `https://openweathermap.org/img/wn/${idIcon}@2x.png`,
    }
    WEATHERNOW.CITY.textContent = currentCity.name
    WEATHERNOW.ICON.src = currentCity.iconURL
    WEATHERNOW.TEMPERATURE.textContent = Math.floor(currentCity.temperature) + '\u00B0'
    storage.saveCurrentCity(currentCity.name)
}

async function getWeather(url) {
 try {
     let response = await fetch(url)
     if(response.ok){
         let data = await response.json()
         setWeatherNow(data)
     } else {
         throw new Error((await response.json()).message)
     }

 }
catch (error) {
     console.log(error.message)
}


}

function searchCity(city) {
    const serverUrl = 'http://api.openweathermap.org/data/2.5/weather'
    const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f'
    const cityName = city
    const url = `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`
    getWeather(url)

}

function createItemNode(city) {
    const listItem = document.createElement('li')
    listItem.classList.add('item-locations')
    listItem.textContent = city
    const delBtn = document.createElement('img')
    delBtn.classList.add('del-btn')
    delBtn.src = './img/icons/delete-button.svg'
    listItem.appendChild(delBtn)
    CITIESLOCATIONS.LIST.appendChild(listItem)
}

function likeButtonHandler() {
    const favoriteCity = WEATHERNOW.CITY.textContent
    if(favoriteListCities.length > 5) {
        favoriteListCities.shift()
    }
    favoriteListCities.push(favoriteCity)
    storage.saveFavoriteCities(favoriteListCities)

    render()

}

function listCityHandler(evt){
    const cityItem = evt.target.textContent
    if(WEATHERNOW.CITY.textContent !== cityItem) {
        if(evt.target.tagName === 'LI') {
            searchCity(cityItem)
        }
    }
    if(evt.target.className === 'del-btn') {
        console.log(evt.target.parentNode.textContent)
       const index = favoriteListCities.indexOf(evt.target.parentNode.textContent)
        favoriteListCities.splice(index, 1)
        storage.saveFavoriteCities(favoriteListCities)
        render()

        evt.target.parentNode.remove()
    }

}
function render(){
    CITIESLOCATIONS.LIST.innerHTML = ''
    const favoriteCities = storage.getFavoriteCities()
    favoriteCities.forEach((city)=> {
        createItemNode(city)
    })
}


SEARCHFORM.FORM.addEventListener('submit', (evt)=> {
    evt.preventDefault()
    searchCity(SEARCHFORM.INPUT.value)
    SEARCHFORM.FORM.reset()
})
BUTTONS.NOW.addEventListener('click', buttonHandler)
BUTTONS.DETAILS.addEventListener('click', buttonHandler)
BUTTONS.FORECAST.addEventListener('click', buttonHandler)
WEATHERNOW.LIKE.addEventListener('click', likeButtonHandler)
CITIESLOCATIONS.LIST.addEventListener('click', listCityHandler)


render()