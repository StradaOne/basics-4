
import {storage} from './storage.js';
import {form, input, temperatureNumber, place, buttonAddCity, 
        city, list, weatherIcon, countryTitle, 
        elementTemperature, elementFeels, elementWeather,
        elementSunrise, elementSunset, 
        tabs, nodeTab} from './constants.js';
import {serverData} from './server.js';

let cities =  storage.getFavoriteCities();

function createHTMLElement(tag, selector, inner){
    const element = document.createElement(tag);
    element.classList.add(selector)
    element.insertAdjacentHTML('afterbegin', `<span class='list__text'>${inner}</span>`)
    element.insertAdjacentHTML('beforeend', `<span class='list__btn'>+</span>`)
    return element;
}

function showCities(){
    if(cities.length){
        cities.forEach(item => {
            const element = createHTMLElement('li', 'list__item', item)
            list.append(element)
        })
    }
}

function deleteHTMLElement(selector){
    const nodeElements = document.querySelectorAll(selector);
    nodeElements.forEach(item => item.remove())
}

function render(){
    deleteHTMLElement('.list__item')
    showCities()
    getData(storage.getCurrentCity())
}

function checkClick(event){
    if(event.target.classList.contains('list__btn')){
        const textElement = event.target.previousSibling.textContent;
        cities = cities.filter(item => item !== textElement)
        storage.saveFavoriteCities(cities)
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
    event.target.classList.add('active')
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

function createUrl(serverUrl, cityName, apiKey){
    return `${serverUrl}?q=${cityName}&appid=${apiKey}`;
}

function getCelsius(tmp){
    return Math.ceil(tmp - 273.15);
}

function getSun(upOrDown, timezone){
  return (new Date((upOrDown + timezone)*1000)).getHours() + ':' + (new Date((upOrDown + timezone)*1000)).getMinutes();
}

function pushData(event){
    event.preventDefault()
    const cityName = input.value;

    getData(cityName)

    form.reset()
}

function showDetails(data){
    const tmpC = getCelsius(data.main.temp)

    temperatureNumber.textContent = tmpC;
    elementTemperature.textContent = tmpC;
     
    elementFeels.textContent = getCelsius(data.main.feels_like);
    elementWeather.textContent = data.weather[0].main;

    elementSunrise.textContent = getSun(data.sys.sunrise, data.timezone);
    elementSunset.textContent = getSun(data.sys.sunset, data.timezone);

    const icon = data.weather[0].icon;
    weatherIcon.setAttribute('src', `${serverData.serverImg}${icon}@2x.png`)
    place.textContent = data.name;
    countryTitle.textContent = data.name;
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

    showDetails(data)

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
        render()
    }
}

list.addEventListener('click', checkClick)
tabs.addEventListener('click', changeClass)
form.addEventListener('submit', pushData)
buttonAddCity.addEventListener('click', addCity)

render()












