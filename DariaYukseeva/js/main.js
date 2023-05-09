const getDOMElement = (selector) => document.querySelector(selector);

const tabsContent = document.querySelectorAll('.tabs-content-item');
const tabsBtn = document.querySelectorAll('.tab-item');
const tabsBtns = getDOMElement('.tabs');
const searchCityInput = getDOMElement('.weather-search-form-input');
const searchCityForm = getDOMElement('.weather-search-form');
const weatherNowIcon = getDOMElement('.weather-now-precipitation-img');
const weatherNowCity = getDOMElement('.selected-city-now');
const weatherNowTemperature = getDOMElement('.temperature');


const tabsBtnsHandler = (event) => {
    if (event.target.classList.contains('tab-item')) {
        const btnIndex = Array.from(tabsBtn).indexOf(event.target);
        tabsBtn.forEach(tab => tab.classList.remove('active-tab'));
        Array.from(tabsBtn)[btnIndex].classList.add('active-tab');
        tabsContent.forEach(block => block.classList.add('inactive-block'));
        Array.from(tabsContent)[btnIndex].classList.remove('inactive-block');
    }
}

const searchFormHandler = (event) => {
    event.preventDefault();
    const city = searchCityInput.value.trim();
    if (!city) {
        alert('Некорректное название города');
        searchCityForm.reset();
        return;
    }
    fetchNowWeather(city);
    searchCityForm.reset();
    
}

async function fetchNowWeather(city) {
    try {
        
        const ServerUrl = 'http://api.openweathermap.org/data/2.5/weather';
        const apiKey = '8b70971e38e651a72781439cafacf538';
        const url = `${ServerUrl}?q=${city}&appid=${apiKey}&units=metric`;

        const respons = await fetch(url);
        console.log(respons);
        if (respons.ok) {
            const data = await respons.json();
           
            const temp = Math.round(data.main.temp);
            const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
            
            renderWeatherNow(city, temp, iconUrl);
        }
        else if (respons.ok === false){
            
            throw new Error(await respons.json().error);
        }
    } catch (error) {
        console.log(error);
    }
}

function renderWeatherNow(city, temp, iconUrl) {
    weatherNowCity.textContent = city;
    weatherNowTemperature.textContent = temp;
    weatherNowIcon.src = iconUrl;
}

tabsBtns.addEventListener('click', tabsBtnsHandler);

searchCityForm.addEventListener('submit', searchFormHandler)
