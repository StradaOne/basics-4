import { convTime } from "./modules/converterTime.js";
import {tabs, displayItem, inputValue, formNode, nameShapeCity, addButtonShape, sectionItem} from "./modules/DOMconstants.js";


function clearInput() {
   return inputValue.value = '';
}


tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active-tab'))
        displayItem.forEach(el => el.classList.remove('active'))

        tab.classList.add('active-tab')
        displayItem[index].classList.add('active')
    })
});

async function getRequest(cityName) {
    try {
        const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
        localStorage.setItem('city', JSON.stringify(cityName))

        const apiKey = '2de34209accba46efc52dfd946a3c2b3';
        const url = `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        createDisplayNow(data);
        createDisplayDetails(data);
        clearInput();
    }
    catch (Err) {
        console.error(Err.message)
    };
};

function createDisplayNow(data) {
    const tempSpan = document.querySelector('.weather-temp span');
    const temperature = data.main.temp;
    tempSpan.textContent = temperature.toFixed(0);

    const iconId = data.weather[0].icon;
    const iconImg = `https://openweathermap.org/img/wn/${iconId}@4x.png`;
    const iconWeather = document.querySelector('.weather-icon img');
    iconWeather.src = iconImg;
    const cityName = document.querySelector('.location-target span');
    cityName.textContent = data.name;

};

function createDisplayDetails(data) {
    const cityName = document.querySelector('.details-city');
    cityName.textContent = data.name;
    const sunrise = document.querySelector('.sunrise');
    const sunset = document.querySelector('.sunset');
    const weather = document.querySelector('.weather-sky');
    const feelslike = document.querySelector('.feels');
    const temperature = document.querySelector('.temperature-list');

    const sunriseValue = convTime(data.sys.sunrise, data.timezone, "HH:mm");
    sunrise.textContent = sunriseValue;

    const sunsetValue = convTime(data.sys.sunset, data.timezone, "HH:mm");
    sunset.textContent = sunsetValue;

    const weatherData = data.weather[0].main;
    weather.textContent = weatherData;

    const feelsLike = data.main.feels_like;
    feelslike.textContent = feelsLike;

    const tempDetails = data.main.temp;
    temperature.textContent = tempDetails.toFixed(0);
};

function createDisplayForecast() {
    
}



//FAVORITES CITIES

const listStorage = localStorage.getItem('array');
const array = new Set(getStorItem());

function getStorItem() {
    if (listStorage) {
        return JSON.parse(listStorage);
    } else {
        return null;
    };
};

function addCity() {
    const name = nameShapeCity.textContent;
    array.add({city: name})
    localStorage.setItem('array', JSON.stringify([...array]))
    console.log(array)
    render();
};

function deleteCity(text) {
    for (let key of array) {
        if (key.city === text) {
            array.delete(key);
        };
    };
    console.log(array)
    localStorage.setItem('array', JSON.stringify([...array]));
    render();
}


function createElement(sectionItem, text) {
    const newElem = document.createElement('span');
    const parent = document.createElement('li');
    newElem.classList.add('new-element')
    newElem.textContent = text;


    const closeBtn = document.createElement('button');
    closeBtn.classList.add('locations-close-btn');
    const closeImg = document.createElement('img');
    closeImg.src = "/basics-4/dkomarov/img/close.svg";

    closeBtn.appendChild(closeImg);
    parent.appendChild(newElem);
    parent.appendChild(closeBtn);
    sectionItem.appendChild(parent);

    newElem.addEventListener('click', () => {
        addFavoritesCity(newElem);

    })

    closeBtn.addEventListener('click', () => {
        deleteCity(newElem.textContent);
        console.log('DELETE');
    })
};

async function addFavoritesCity(newElem) {
    console.log(newElem.textContent);
    const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
    const cityName = newElem.textContent;
    const apiKey = '2de34209accba46efc52dfd946a3c2b3';
    const url = `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`;

    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    createDisplayNow(data);
    createDisplayDetails(data);
    clearInput();

};


function render() {
    sectionItem.innerHTML = '';
    for (let obj of array) {
        createElement(sectionItem, obj.city);
    };
};


// function checkShape(name) {
//     const indexCity = array.findIndex(c => c.name === name);
//     if (indexCity === -1) {
//         document.querySelector('.now-btn-shape').src = "/basics-4/dkomarov/img/Shape.svg";
//     } else {
//         document.querySelector('.now-btn-shape-img').src = "/basics-4/dkomarov/img/ShapeRED.svg";
//     };
// };



formNode.addEventListener('submit', (e) => {
    const cityNames = inputValue.value;
    e.preventDefault();
    getRequest(cityNames);

});


addButtonShape.addEventListener('click', () => {
    addCity();
    // checkShape();

});

window.addEventListener('DOMContentLoaded', () => {
   const currentCity = JSON.parse(localStorage.getItem('city')) || '';
    getRequest(currentCity)
})

render();
