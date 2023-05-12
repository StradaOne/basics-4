
import {storage} from './storage.js';

function getElement(selector){
    return document.querySelector(selector);
}

const form = getElement('.weather__form');
const input = getElement('.weather__input');
const temperatureNumber = getElement('.temperature__number');
const place = getElement('.tab-block__country');
const buttonAddCity = getElement('.tab-block__img');
const city = getElement('.tab-block__country');
const list = getElement('.list');
const listItem = getElement('.list__item');
const weatherIcon = getElement('.weather__icon');
const countryTitle = getElement('.country-title');
const elementTemperature = getElement('.element-temperature');
const elementFeels = getElement('.element-feels');
const elementWeather = getElement('.element-weather');
const elementSunrise = getElement('.element-sunrise');
const elementSunset = getElement('.element-sunset');
const tabs = getElement('.tabs');
const nodeTab = document.querySelectorAll('.tab');

const serverData = {
    serverUrl: 'http://api.openweathermap.org/data/2.5/weather',
    apiKey: 'f660a2fb1e4bad108d6160b7f58c555f',
}

let cities =  storage.getFavoriteCities();

function createUrl(serverUrl, cityName, apiKey){
    return `${serverUrl}?q=${cityName}&appid=${apiKey}`;
}

function createLoader(){
    const loader = document.createElement('div');
    loader.classList.add('loader')
    loader.textContent = 'loading';
    document.body.prepend(loader)
}

function removeLoader(){
    const loader = document.querySelector('.loader');
    loader.remove()
}

async function pushData(event){
    createLoader()
    event.preventDefault()
    const cityName = input.value;
    // getData(cityName)
    const url = createUrl(serverData.serverUrl, cityName, serverData.apiKey);
    
    const data = await fetch(url)
                    .then(response => {
                        if(response.ok){
                            return response.json()
                        }
                        return Promise.reject(new Error(response.status))
                    })
                    .then(data => data)
                    .catch(error => alert(error))
                    .finally(() => removeLoader())
                    
            
    const temperatureK = data.main.temp;
    const temperatureC = Math.ceil(temperatureK - 273.15);
    temperatureNumber.textContent = temperatureC;
    elementTemperature.textContent = temperatureC;
    elementFeels.textContent = Math.ceil(data.main.feels_like - 273.15);
    elementWeather.textContent = data.weather[0].main;
    elementSunrise.textContent = (new Date((data.sys.sunrise + data.timezone)*1000)).getHours() + ':' + (new Date((data.sys.sunrise + data.timezone)*1000)).getMinutes();
    elementSunset.textContent = (new Date((data.sys.sunset + data.timezone)*1000)).getHours() + ':' + (new Date((data.sys.sunset + data.timezone)*1000)).getMinutes();
    const icon = data.weather[0].icon;
    weatherIcon.setAttribute('src', `https://openweathermap.org/img/wn/${icon}@2x.png`)
    place.textContent = data.name;
    countryTitle.textContent = data.name;

    form.reset()
}

function addCity(){
    const myCity = city.textContent;
    const result = cities.find(item => item === myCity);
    if(result){
        alert('This city exists in your list')
    } else {
        cities.push(myCity)
        storage.saveFavoriteCities(cities)
        storage.setStartCity(myCity)
        deleteHTMLElement('.list__item')
        render()
    }
}

function render(){
    if(cities.length){
        cities.forEach(item => {
            const element = createHTMLElement('li', 'list__item', item)
            list.append(element)
        })
    }
}

function createHTMLElement(tag, selector, inner){
    const element = document.createElement(tag);
    element.classList.add(selector)
    element.insertAdjacentHTML('afterbegin', `<span class='list__text'>${inner}</span>`)
    element.insertAdjacentHTML('beforeend', `<span class='list__btn'>+</span>`)
    return element;
}

function deleteHTMLElement(selector){
    const nodeElements = document.querySelectorAll(selector);
    nodeElements.forEach(item => item.remove())
}

render()

if(!storage.getCurrentCity()){
    getData('Minsk')
} else {
    getData(storage.getCurrentCity())
}

async function getData(city){
    createLoader()
    const cityName = city;
    const url = createUrl(serverData.serverUrl, cityName, serverData.apiKey);
    
    const data = await fetch(url)
                    .then(response => {
                        if(response.ok){
                            return response.json()
                        }
                        return Promise.reject(new Error(response.status))
                    })
                    .then(data => data)
                    .catch(error => alert(error))
                    .finally(() => removeLoader())
                    
    const temperatureK = data.main.temp;
    const temperatureC = Math.ceil(temperatureK - 273.15);

    temperatureNumber.textContent = temperatureC;
    elementTemperature.textContent = temperatureC;
    elementFeels.textContent = Math.ceil(data.main.feels_like - 273.15);
    elementWeather.textContent = data.weather[0].main;
    elementSunrise.textContent = (new Date((data.sys.sunrise + data.timezone)*1000)).getHours() + ':' + (new Date((data.sys.sunrise + data.timezone)*1000)).getMinutes();
    elementSunset.textContent = (new Date((data.sys.sunset + data.timezone)*1000)).getHours() + ':' + (new Date((data.sys.sunset + data.timezone)*1000)).getMinutes();
    const icon = data.weather[0].icon;
    weatherIcon.setAttribute('src', `https://openweathermap.org/img/wn/${icon}@2x.png`)
    place.textContent = data.name;
    countryTitle.textContent = data.name;
}

function checkClick(event){
    if(event.target.classList.contains('list__btn')){
        const textElement = event.target.previousSibling.textContent;
        cities = cities.filter(item => item !== textElement)
        storage.saveFavoriteCities(cities)
        deleteHTMLElement('.list__item')
        render()
    }
    if(event.target.classList.contains('list__text')){
        const textElement = event.target.textContent;
        storage.setStartCity(textElement)
        getData(textElement)
    }
}

function changeClass(event){
    nodeTab.forEach(item => item.classList.remove('active'))
    event.target.classList.toggle('active')
}

form.addEventListener('submit', pushData)
buttonAddCity.addEventListener('click', addCity)
list.addEventListener('click', checkClick)
tabs.addEventListener('click', changeClass)

