import {
    detailsBtn,
    displayDetails,
    displayForecast,
    displayNow,
    forecastBtn,
    inputSearch,
    nowBtn,
    searchForm,
    weatherCityNow,
    temperatureNow
} from './assets/variables.js'


function buttonHandler(evt){
    evt.target.classList.add('active')
    if(evt.target === nowBtn){
        displayNow.style.display = 'block'
        detailsBtn.classList.remove('active')
        forecastBtn.classList.remove('active')
        displayDetails.style.display = 'none'
        displayForecast.style.display = 'none'

    }
    if(evt.target === detailsBtn){
        displayDetails.style.display = 'block'
        nowBtn.classList.remove('active')
        forecastBtn.classList.remove('active')
        displayNow.style.display = 'none'
        displayForecast.style.display = 'none'

    }
    if(evt.target === forecastBtn){
        displayForecast.style.display = 'block'
        detailsBtn.classList.remove('active')
        nowBtn.classList.remove('active')
        displayNow.style.display = 'none'
        displayDetails.style.display = 'none'

    }
}


function setWeatherNow(data){
    weatherCityNow.textContent = data.name
    const temperature = data.main.temp
    temperatureNow.textContent = Math.floor(temperature) + '\u00B0'
}

async function getWeather(url) {
    let response = await fetch(url)
    let data = await response.json()
    setWeatherNow(data)
}

function searchCity() {
    const serverUrl = 'http://api.openweathermap.org/data/2.5/weather'
    const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f'
    const cityName = inputSearch.value
    const url = `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`
    getWeather(url)

}

searchForm.addEventListener('submit', (evt)=> {
    evt.preventDefault()
    searchCity()
})
nowBtn.addEventListener('click', buttonHandler)
detailsBtn.addEventListener('click', buttonHandler)
forecastBtn.addEventListener('click', buttonHandler)