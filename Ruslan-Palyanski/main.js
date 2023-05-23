
import {storage} from './storage.js';
import {form, input, temperatureNumber, place, buttonAddCity, 
        city, list, weatherIcon, countryNodeTitle, 
        elementTemperature, elementFeels, elementWeather,
        elementSunrise, elementSunset, 
        tabs, nodeTab, tabDate, tabTime, tm, 
        like, rain, imgPng, tab3, tabContent} from './constants.js';
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
    let cities =  storage.getFavoriteCities();
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
        cities = cities.filter(item => item !== textElement);
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

function getSun(upOrDown){
  return (new Date((upOrDown)*1000)).getHours() + ':' + (new Date((upOrDown)*1000)).getMinutes();
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

    elementSunrise.textContent = getSun(data.sys.sunrise);
    elementSunset.textContent = getSun(data.sys.sunset);

    const icon = data.weather[0].icon;
    weatherIcon.setAttribute('src', `${serverData.serverImg}${icon}@2x.png`)
    place.textContent = data.name;
    countryNodeTitle.forEach(item => item.textContent = data.name)
}

async function getData(city){
    createLoader()
    const cityName = city;
    
    const url = createUrl(serverData.serverUrl, cityName, serverData.apiKey);
    
    const data = await fetch(url)
                       .then(response => {
                           if(response.ok){
                               return response.json();
                           }
                           return Promise.reject(new Error(response.status));
                       })
                       .then(data => data)
                       .catch(error => alert(error))


    const forecastUrl = createUrl(serverData.serverForecastUrl, cityName, serverData.apiKey);
    const data1 = await fetch(forecastUrl)
                        .then(response => {
                            if(response.ok){
                                return response.json();
                            }
                            return Promise.reject(new Error(response.status));
                        })
                        .then(data => data)
                        .catch(error => alert(error))

    const [dataP1, dataP2] = await Promise.all([data, data1])
                    .then(data => data)
                    .catch(error => alert(error))
                    .finally(() => removeLoader())

    showDetails(dataP1)

    tabContent.innerHTML = '';

    for(let i = 0; i < dataP2.list.length; ++i){
        const [data, time] = dataP2.list[i].dt_txt.split(' ');
        const {temp: tempK, feels_like: feels} = dataP2.list[i].main;
        const {main: rainServer, icon: img} = dataP2.list[i].weather[0];

        const tm = getCelsius(tempK);
        const like = getCelsius(feels);
        const cloud = rainServer;
        const imgUrl = `${serverData.serverImg}${img}@2x.png`;

        createTabBlock(data, time, tm, like, cloud, imgUrl)
    }
}

function createTabBlock(date, time, tm, feels, cloud, img){
    tabContent.insertAdjacentHTML('beforeEnd', `
        <div class="tab-3__block">
        <div class="tab-3__data">
            <div class="tab-3__date">${date}</div>
            <div class="tab-3__time">${time}</div>
        </div>
        <div class="tab-3__weaather">
            <div class="block-1">
                <div class="tm">Temperature: <span class="tm-i">${tm}</span>&deg;</div>
                <div class="like">Feels like: <span class="like-i">${feels}</span>&deg;</div>
            </div>
            <div class="block-2">
                <div class="rain">${cloud}</div>
                <div class="img__cloud"><img src="${img}" height="35" class="img__png" alt=""></div>
            </div>
        </div>
        </div>`)
}

function addCity(){
    const myCity = city.textContent;
    // 
    const result = cities.find(item => item === myCity);
    if(result){
            alert('This city exists in your list')
        }
    cities.push(myCity)
    storage.saveFavoriteCities(cities)
    storage.setStartCity(myCity)
    render()
    // 
    // const result = cities.find(item => item === myCity);
    // if(result){
    //     alert('This city exists in your list')
    // } else {
    //     cities.push(myCity)
    //     storage.saveFavoriteCities(cities)
    //     storage.setStartCity(myCity)
    //     render()
    // }
}

list.addEventListener('click', checkClick)
tabs.addEventListener('click', changeClass)
form.addEventListener('submit', pushData)
buttonAddCity.addEventListener('click', addCity)

render()












