const form = document.querySelector('.weather-search');
const btnFav = document.querySelector('.weather-left-now-info-favourite');
const addedBlock = document.querySelector('.weather-right-info')
const tabs = document.querySelector('.weather-tabs')

import {setLS} from './local.js';
import {getLS} from './local.js';

let cityMain = getLS('city');
let list = [];


form.addEventListener('submit', sendForm);
btnFav.addEventListener('click', addFav);
addedBlock.addEventListener('click', deleteFav);
addedBlock.addEventListener('click', sendFav);
tabs.addEventListener('click', changeTab)

function sendForm(e){
    e.preventDefault();
    const cityName = document.querySelector('.weather-search-input').value
    e.target.reset(); 
    getCityRequest(cityName);
}

async function getCityRequest(city) {
    const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
    const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
    const url = `${serverUrl}?q=${city}&appid=${apiKey}&units=metric`;
    
    cityMain = city;
    setLS(cityMain, "city")

    await fetch(url)
        .then(async (data) => {
            const obj =  await data.json();
            console.log(obj)
            if (obj.message === "city not found") return alert('Город англиски пжэжэ, первая буква большая(Вот пример для одаренных: Vladivostok')
            renderNow(obj)
            renderDetails(obj)
        })
        .catch(()=> alert('Нахуй ты все сломал? Давай чини.'))
}

function renderNow(data){
    const cityText = data.name;
    const iconBlockNow = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconBlockNow}@4x.png`;
    const tempText = Math.round(data.main.temp);
    const city = document.querySelector('.weather-left-now-info-city-text');
    const temp = document.querySelector('.weather-left-now-info-degree-number');
    const icon = document.querySelector('.weather-left-now-info-icon')
    icon.setAttribute('src', iconUrl)
    city.textContent = cityText;
    temp.textContent = tempText;
}

function renderDetails(data){
    const cityText = data.name;
    const tempText = Math.round(data.main.temp);
    const fellsText = Math.round(data.main.feels_like);
    const weatherText = data.weather[0].main;
    const sunriseText = (new Date((data.sys.sunrise + data.timezone)*1000)).getHours() + ':' + (new Date((data.sys.sunrise + data.timezone)*1000)).getMinutes();
    const sunsetText = (new Date((data.sys.sunset + data.timezone)*1000)).getHours() + ':' + (new Date((data.sys.sunset + data.timezone)*1000)).getMinutes();

    const city = document.querySelector('.weather-left-details-info-city');
    const temperature = document.querySelector('.weather-left-details-info-temperature');
    const feels = document.querySelector('.weather-left-details-info-feels');
    const weather = document.querySelector('.weather-left-details-info-weather');
    const sunrise = document.querySelector('.weather-left-details-info-sunrise');
    const sunset = document.querySelector('.weather-left-details-info-sunset');
    
    city.innerHTML = '';
    temperature.innerHTML = '';
    feels.innerHTML = '';
    weather.innerHTML = '';
    sunrise.innerHTML = '';
    sunset.innerHTML = '';

    city.textContent = data.name;
    temperature.textContent = `Temperature: ${tempText}°`
    feels.textContent = `Feels like: ${fellsText}°`
    weather.textContent = `Weather: ${weatherText}`
    sunrise.textContent = `Sunrise: ${sunriseText}`
    sunset.textContent = `Sunset: ${sunsetText}`

}

function addFav(){
    const city = document.querySelector('.weather-left-now-info-city-text').textContent;
    if (list.find(item => item === city)) return alert('Данный город уже добавлен в любимые')
    list.push(city)
    setLS(list, "list");
    renderList()
}

function deleteFav(e){
    const targ = e.target;
    if (targ.matches('div.delete')){  
        const name = targ.parentNode.textContent;
        const listInd = list.findIndex(item => item === name);
        list.splice(listInd, 1)
        setLS(list, "list");
        renderList()
    }
}

function sendFav(e) {
    const targ = e.target;
    if (targ.matches('li')){  
        const name = targ.textContent;
        getCityRequest(name)
    }
}

function renderList(){
    const ul = document.querySelector('.weather-right-info-list');
    ul.innerHTML = '';
    list = getLS("list");
    if (!Array.isArray(list)) list = [];
    list.forEach(item => {
        console.log(item)
        const li = document.createElement('li');
        const divDel = document.createElement('div');
        li.textContent = item;
        divDel.classList.add('delete');
        ul.append(li);
        li.append(divDel);
    })
}

function changeTab(e) {
    const targ = e.target;
    const nowTab = document.querySelector('.weather-tabs-now');
    const detailsTab = document.querySelector('.weather-tabs-details');
    const forecastTab = document.querySelector('.weather-tabs-forecast');
    const nowBlock = document.querySelector('#now');
    const detailsBlock = document.querySelector('#details');
    const forecastBlock = document.querySelector('#forecast');
    if (targ.matches('li.weather-tabs-now')) {
        nowTab.classList.add('check')
        nowBlock.classList.remove('hide')

        detailsTab.classList.remove('check')
        forecastTab.classList.remove('check')
        detailsBlock.classList.add('hide')
        forecastBlock.classList.add('hide')
    }

    if (targ.matches('li.weather-tabs-details')) {
        detailsTab.classList.add('check')
        detailsBlock.classList.remove('hide')

        nowTab.classList.remove('check')
        forecastTab.classList.remove('check')
        nowBlock.classList.add('hide')
        forecastBlock.classList.add('hide')
    }

    if (targ.matches('li.weather-tabs-forecast')) {
        forecastTab.classList.add('check')
        forecastBlock.classList.remove('hide')

        nowTab.classList.remove('check')
        detailsTab.classList.remove('check')
        nowBlock.classList.add('hide')
        detailsBlock.classList.add('hide')
    }
}

renderList()
if (cityMain) getCityRequest(cityMain);