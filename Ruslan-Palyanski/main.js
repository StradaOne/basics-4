
import {storage} from './storage.js';
import {form, input, temperatureNumber, place, buttonAddCity, 
        city, list, weatherIcon, countryNodeTitle, 
        elementTemperature, elementFeels, elementWeather,
        elementSunrise, elementSunset, 
        tabs, nodeTab, tabDate, tabTime, tm, 
        like, rain, imgPng, tab3, tabContent} from './constants.js';
import {serverData, getData} from './server.js';


const currentCity = storage.getCurrentCity();

const [dataP1, dataP2] = await getData(currentCity);


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

function showForecast(dataP2){
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

function render(dataP1, dataP2, cities, city){
    if(dataP1){
        showDetails(dataP1)
    }

    if(dataP2){
        showForecast(dataP2)
    }
    
    if(cities){
        showCities(cities)
    } else {
        showCities()
    }

    if(city){
        place.textContent = city;
    }
}

function createHTMLElement(tag, selector, inner){
    const element = document.createElement(tag);
    element.classList.add(selector)
    element.insertAdjacentHTML('afterbegin', `<span class='list__text'>${inner}</span>`)
    element.insertAdjacentHTML('beforeend', `<span class='list__btn'>+</span>`)
    return element;
}

function createElementRecurs(citiesArr, lengthArr, i = 0){

    if(i === lengthArr){
        return;
    } 

    const element = createHTMLElement('li', 'list__item', citiesArr[i]);
    list.append(element)

    createElementRecurs(citiesArr, lengthArr, ++i)
    
}

function showCities(){
    let cities =  storage.getFavoriteCities();

    deleteHTMLElement('.list__item')

    if(cities.length){
        // cities.forEach(item => {
        //     const element = createHTMLElement('li', 'list__item', item);
        //     list.append(element)
        // })

        createElementRecurs(cities, cities.length, 0)
    }
}

function removeElementRecurs(nodeElements, nodeElementsLength, i = 0){
    if(i === nodeElementsLength){
        return;
    }
    nodeElements[i].remove()
    removeElementRecurs(nodeElements, nodeElementsLength, ++i)
}

function deleteHTMLElement(selector){
    const nodeElements = document.querySelectorAll(selector);
    // nodeElements.forEach(item => item.remove())

    removeElementRecurs(nodeElements, nodeElements.length, 0)
}



async function checkClick(event){
    if(event.target.classList.contains('list__btn')){
        const textElement = event.target.previousSibling.textContent;
        const cities = storage.getFavoriteCities();
        const restCities = cities.filter(item => item !== textElement);
        storage.saveFavoriteCities(restCities)
        render(dataP1, dataP2, restCities)
    }
    if(event.target.classList.contains('list__text')){
        const textElement = event.target.textContent;
        storage.setStartCity(textElement)

        const [dataP1, dataP2] = await getData(textElement);
        render(dataP1, dataP2)
    }
}

function nodeTabPrintActive(nodeTab, nodeTabLangth, i = 0){
    if(nodeTabLangth === i){
        return;
    }

    nodeTab[i].classList.remove('active')

    nodeTabPrintActive(nodeTab, nodeTabLangth, ++i)
}

function changeClass(event){
    // nodeTab.forEach(item => item.classList.remove('active'))
    // event.target.classList.add('active')

    nodeTabPrintActive(nodeTab, nodeTab.length, 0)

    event.target.classList.add('active')
}

function getCelsius(tmp){
    return Math.ceil(tmp - 273.15);
}

function getSun(upOrDown){
  return (new Date((upOrDown)*1000)).getHours() + ':' + (new Date((upOrDown)*1000)).getMinutes();
}

async function pushData(event){
    event.preventDefault()
    const cityName = input.value;

    const [dataP1, dataP2] = await getData(cityName);

    render(dataP1, dataP2)

    form.reset()

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
    storage.saveFavoriteCities([...storage.getFavoriteCities(), myCity])
    storage.setStartCity(myCity)

    const cities = storage.getFavoriteCities();
    
    render(dataP1, dataP2, cities, myCity)
}

list.addEventListener('click', checkClick)
tabs.addEventListener('click', changeClass)
form.addEventListener('submit', pushData)
buttonAddCity.addEventListener('click', addCity)

render(dataP1, dataP2)













