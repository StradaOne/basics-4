
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

const serverData = {
    serverUrl: 'http://api.openweathermap.org/data/2.5/weather',
    apiKey: 'f660a2fb1e4bad108d6160b7f58c555f',
}

let cities = ['Amur', 'Samara', 'Bali', 'Dane', 'Kilo', 'Nur-Sultan'];

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
    const icon = data.weather[0].icon;
    weatherIcon.setAttribute('src', `https://openweathermap.org/img/wn/${icon}@2x.png`)
    place.textContent = data.name;

    form.reset()
}

function addCity(){
    const myCity = city.textContent;
    const result = cities.find(item => item === myCity);
    if(result){
        alert('This city exists in your list')
    } else {
        cities.push(myCity)
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
    const icon = data.weather[0].icon;
    weatherIcon.setAttribute('src', `https://openweathermap.org/img/wn/${icon}@2x.png`)
    place.textContent = data.name;
}

function checkClick(event){
    if(event.target.classList.contains('list__btn')){
        const textElement = event.target.previousSibling.textContent;
        cities = cities.filter(item => item !== textElement)
        console.log(cities.length)
        deleteHTMLElement('.list__item')
        render()
    }
    if(event.target.classList.contains('list__text')){
        const textElement = event.target.textContent;
        getData(textElement)
    }
}

form.addEventListener('submit', pushData)
buttonAddCity.addEventListener('click', addCity)
list.addEventListener('click', checkClick)
