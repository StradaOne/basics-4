import {elements} from './modules/elements.js';
import {convertTime} from './modules/converAll.js';
import {getForecastRequest, createForecastEl} from './modules/weatherForecast.js';

const cities = JSON.parse(localStorage.getItem('cities')) || [];
render();
lastCity();



elements.addForm.addEventListener('submit',(event) => {
    event.preventDefault();
    getWeather(elements.addPlace.value);
    getForecastRequest(elements.addPlace.value);
    elements.addPlace.value = '';
});

elements.btnAdd.addEventListener('click', (event) => {
    event.preventDefault();
    checkCity (elements.countryNow.textContent);
})

function checkCity (item) {
    let checkout = cities.includes(item);
    if (checkout === true) {
        deleteCity(item);
    } else {
        addList(item);
        elements.btnAdd.removeAttribute('src');
        elements.btnAdd.setAttribute('src', 'img/shapeActive.png');
    }
}

function checkAdd (item) {
    let checkout = cities.includes(item);
    if (checkout === true) {
        elements.btnAdd.removeAttribute('src');
        elements.btnAdd.setAttribute('src', 'img/shapeActive.png');
    } else {
        elements.btnAdd.removeAttribute('src');
        elements.btnAdd.setAttribute('src', 'img/shape.png');
    }
}

export function addWeather(item) {
    const temperature = Math.ceil(item.main.temp - 273.15);
    elements.temperatureNow.textContent = `${temperature}°`;
    elements.countryNow.textContent = item.name;
    const iconUrl = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;
    elements.iconTemp.setAttribute('src', iconUrl);  
    elements.btnAdd.setAttribute('src', 'img/shape.png');

    elements.listCity.textContent = item.name;
    elements.listTemp.textContent = `Temperature: ${temperature}°`;
    elements.listFeels.textContent = `Feels like: ${Math.ceil(item.main.feels_like - 273.15)}°`;
    elements.listWeather.textContent = `Weather: ${item.weather[0].main}`;
    elements.listSunrise.textContent = `Sunrise: ${convertTime(item.sys.sunrise)}`;
    elements.listSunset.textContent = `Sunset: ${convertTime(item.sys.sunset)}`;

};

async function getWeather(name) {
    const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
    const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
    const url = `${serverUrl}?q=${name}&appid=${apiKey}`;
    try {
        let response = await fetch(url);
        let weather = await response.json();
        addWeather(weather);
        checkAdd(elements.countryNow.textContent);
    } catch(err) {
        alert(err);
    }
    saveLastCity();
};

function addList (city) {
    cities.push(city);
    render();
    localStorage.setItem('cities', JSON.stringify(cities));
}

function idNumber() {
    let number = Date.now();
    return number;
}

function createCity(item){
    let newId = idNumber();
    
    const newDiv = document.createElement('div');
    newDiv.className = 'div_list';

    const element = document.createElement('li');
    element.className = 'list__item';
    element.textContent = item;
    element.setAttribute('id', `${newId}`);

    elements.list.append(newDiv)
    newDiv.prepend(element);

    element.addEventListener("click", () => {
        getWeather(item);
        getForecastRequest(item);
      });
}

function render() {
    elements.list.innerHTML = '';
    cities.forEach(function(element) {
        createCity(element);
    })
}

function deleteCity(item) {
    let cityName = cities.findIndex(task => task === item);
    cities.splice(cityName, 1);
    render();
    localStorage.setItem('cities', JSON.stringify(cities));
    checkAdd(elements.countryNow.textContent);
}

function saveLastCity() {
    let lastCity = elements.countryNow.textContent;
    localStorage.setItem('lastCity', JSON.stringify(lastCity));
}

function lastCity() {
    if(JSON.parse(localStorage.getItem('lastCity')) !== null) {
        getWeather(JSON.parse(localStorage.getItem('lastCity')));
        getForecastRequest(JSON.parse(localStorage.getItem('lastCity')));
    } else {
        getWeather('Moscow');
        getForecastRequest('Moscow');
    }
}

