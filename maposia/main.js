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
    temperatureNow,
    addBtn,
    listCities
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
    const idIcon = data.weather[0].icon
    document.querySelector('.weather-icon').src = `https://openweathermap.org/img/wn/${idIcon}@2x.png`
    temperatureNow.textContent = Math.floor(temperature) + '\u00B0'
}

async function getWeather(url) {
             try {
                 let response = await fetch(url)
                 console.log(response)
                 if(response.ok){
                     let data = await response.json()
                     setWeatherNow(data)
                 } else {
                     throw new Error((await response.json()).message)
     }

 }
catch (error) {
    console.error(error.message)
}


}

function searchCity(city) {
    const serverUrl = 'http://api.openweathermap.org/data/2.5/weather'
    const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f'
    const cityName = city
    const url = `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`
    getWeather(url)

}

function delBtnHandler(evt){
    if(evt.target.className === 'city_delBtn'){
        const parentNode = evt.target.parentNode
        parentNode.remove()
    }

}

function isActive(target) {
    return target.textContent === weatherCityNow.textContent
}

function chooseCity(evt){
    if(!isActive(evt.target)){
        if(evt.target.tagName === 'LI') {
            searchCity(evt.target.textContent)
        }
    }

}

function addCityHandler(){
    const item = document.createElement('li')
    item.classList.add('item-locations')
    item.textContent = weatherCityNow.textContent
    const delBtn = document.createElement('img')
    delBtn.src = './img/icons/del-btn.png'
    delBtn.classList.add('city_delBtn')

    item.appendChild(delBtn)
    listCities.appendChild(item)
}



searchForm.addEventListener('submit', (evt)=> {
    evt.preventDefault()
    searchCity(inputSearch.value)
    searchForm.reset()
})


nowBtn.addEventListener('click', buttonHandler)
detailsBtn.addEventListener('click', buttonHandler)
forecastBtn.addEventListener('click', buttonHandler)
addBtn.addEventListener('click',addCityHandler)
listCities.addEventListener('click', chooseCity)
listCities.addEventListener('click', delBtnHandler)
