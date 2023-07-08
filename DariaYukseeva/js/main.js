// Задача: отображение погоды для выбранного города.

import {getDOMElement, timeConverter, dateConverter, saveToLocalStorage, loadFromLocalStorage} from './utils.js';
import {CityValidationError, KeyError, FetchError, InternalError, MyError} from './errors.js';

const tabsContent = document.querySelectorAll('.tabs-content-item');
const tabsBtn = document.querySelectorAll('.tab-item');
const tabsBtns = getDOMElement('.tabs');
const searchCityInput = getDOMElement('.weather-search-form-input');
const searchCityForm = getDOMElement('.weather-search-form');
const weatherNowCity = getDOMElement('.selected-city-now');
const btnAddFavoriteCity = getDOMElement('.favorite-btn');
const favoriteCitiesList = getDOMElement('.favourite-cities-list');


const storage = {
    favCities: new Set(),
    lastCity: '',
    
    getFavList: function (){
        return storage.favCities;
    },
    loadFavsList: function(){
        if ( loadFromLocalStorage('favCities') ) {
            const localStorage = loadFromLocalStorage('favCities');
            storage.favCities = new Set(localStorage);
        }
    },
    loadLastCity: function() {
        if ( loadFromLocalStorage('lastCity') ) {
            const localStorage = loadFromLocalStorage('lastCity');
            storage.lastCity = localStorage;
        }
    },
    saveFavList: function(){
        const citiesArray = [...storage.favCities];
        saveToLocalStorage('favCities', citiesArray);        
    },
    saveLastCity: function () {
        saveToLocalStorage('lastCity', storage.lastCity); 
    },
    hasFavListCity: function(city){
        return storage.favCities.has(city);
    },
};

// отображение информации
async function showWeather(city) {
    try {
        // получение данных с сервера
        const data = await fetchWeather('weather', city);
        const dataForecast = await fetchWeather('forecast', city);
       
        // подготовка необходимых данных
        const vars = process(data);
        const varsForecast = processForecastData(dataForecast);
                
        // сохранение последнего загруженного города в локал сторедж
        storage.saveLastCity();
        
        // изменение цвета города вкладки now
        weatherNowCity.style.color = '#FFFFFF';
        // отрисовка данных
        render(vars, varsForecast);
        renderFavoriteCities();
    }
    catch (err) {
        if (err instanceof MyError) {
            alert(err);

        } else if (err instanceof TypeError) {
            alert(err + '\nСервис недоступен. Проверьте подключение к сети.');
        } else {
            alert(err);
        }
        
    }
    
}

// получение данных от api
async function fetchWeather(api, city) {
    const apiKey = '8b70971e38e651a72781439cafacf538';
    const ServerUrl = `http://api.openweathermap.org/data/2.5/${api}`;
    const url = `${ServerUrl}?q=${city}&appid=${apiKey}&units=metric`;

    const respons = await fetch(url);
    if (respons.ok) {          
        const data = await respons.json();
        return data;           
    } else {
        errorSorting( (await respons.json()).message, city );
    }
}

function errorSorting(message, city) {
    if (message === 'city not found') {
        formSetError(city);
        throw new CityValidationError(city);

    } else if ( message.includes('Failed to fetch') ) {
        throw new FetchError("Произошла ошибка. Обратитесь к администратору");

    } else if ( message.includes('Invalid API key') ) {
        throw new KeyError("Произошла ошибка. Обратитесь к администратору");

    } else if ( message.includes('Internal error') ) {
        throw new InternalError("Произошла ошибка. Обратитесь к администратору");

    } else {
        throw new FetchError(message);
    }
}

// обработчик слушателя инпута 
const inputHandler = () => {
    if ( searchCityInput.classList.contains('invalid-city') ) {
    searchCityInput.classList.remove('invalid-city');
    }
}
// обработка ошибки не найденного города
function formSetError(city) {
    // alert('Такой город не найден');
    searchCityInput.value = city;
    searchCityInput.classList.add('invalid-city');
    //слушатель на изменения в инпуте 
    searchCityInput.addEventListener('input', inputHandler);
           
}

// выбор нужных данных из полученных 
function process(data) {
    const vars = {};

    vars.city = data.name;
    vars.temp = Math.round(data.main.temp);
    // vars.iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
    vars.iconUrl = `./assets/img/icons/${data.weather[0].icon}.png`;
    vars.feelsLikeTemp = Math.round(data.main.feels_like);
    vars.precipitation = data.weather[0].main;
    vars.timeZone = data.timezone;
    vars.sunrise = timeConverter(data.sys.sunrise, vars.timeZone);
    vars.sunset = timeConverter(data.sys.sunset, vars.timeZone);
    storage.lastCity = vars.city;
            
    return vars;
}

// выбор нужных данных из полученных для forecast
function processForecastData(data) {
    const vars = {};
    vars.city = data.city.name;
    vars.timeZone = data.city.timezone;
    vars.forecastList = [];
    for (let i = 0; i < 5; i++) {
        const list = {}
        list.time = timeConverter(data.list[i].dt, vars.timeZone);
        list.date = dateConverter(data.list[i].dt, vars.timeZone);
        list.temp = Math.round(data.list[i].main.temp);
        list.feelsLikeTemp = Math.round(data.list[i].main.feels_like);
        list.precipitation = data.list[i].weather[0].main;
        // list.iconUrl = `https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@4x.png`;
        list.iconUrl = `./assets/img/icons/${data.list[i].weather[0].icon}.png`;

        vars.forecastList.push(list);
    }
    return vars;
}

// отрисовка данных
function render(vars, varsForecast) {
    const varsForNow = {
        city: vars.city,
        temp: vars.temp,
        iconUrl: vars.iconUrl,
        precipitation: vars.precipitation,
    };
    renderWeatherNow(varsForNow);

    const varsForDetailes = {
        city: vars.city,
        temp: vars.temp,
        feelsLikeTemp: vars.feelsLikeTemp,
        precipitation: vars.precipitation,
        timeZone: vars.timeZone,
        sunrise: vars.sunrise,
        sunset: vars.sunset,
    };
    renderWeatherDetails(varsForDetailes);

    renderForecast(varsForecast);
}

// Отрисовка окна Now
function renderWeatherNow(vars) {
    const weatherNowIcon = getDOMElement('.weather-now-precipitation-img');
    const weatherNowTemperature = getDOMElement('.temperature');

    weatherNowCity.textContent = vars.city;
    weatherNowTemperature.textContent = vars.temp;
    weatherNowIcon.src = vars.iconUrl;

    // добавление обработки события наведения мыши
    const iconHandler = () => {
        weatherNowIcon.title = vars.precipitation;
    };
    // добавление слушателя события наведения мыши на иконку
    weatherNowIcon.addEventListener('mouseenter', iconHandler);

    // добавление нового бэкграунда для кнопки при отрисовке избранного города
    if ( storage.hasFavListCity(vars.city) ) {
        
        btnAddFavoriteCity.classList.add('favorite-btn-for-saved-city');
    } else {

        btnAddFavoriteCity.className = 'favorite-btn';
    }
}

// Отрисовка окна Details
function renderWeatherDetails(vars) {
    const weatherDetailsCity = getDOMElement('.selected-city-details');
    const weatherDetailsTemp = getDOMElement(".weather-details-temp");
    const weatherDetailsFeelsLike = getDOMElement(".weather-details-feels-like");
    const weatherDetailsPrecipitation = getDOMElement(".weather-details-precipitation");
    const weatherDetailsSunrise = getDOMElement(".weather-details-sunrise");
    const weatherDetailsSunset = getDOMElement(".weather-details-sunset");

    weatherDetailsCity.textContent = vars.city;
    weatherDetailsTemp.textContent = vars.temp;
    weatherDetailsFeelsLike.textContent = vars.feelsLikeTemp;
    weatherDetailsPrecipitation.textContent = vars.precipitation;
    weatherDetailsSunrise.textContent = vars.sunrise;
    weatherDetailsSunset.textContent = vars.sunset;
}

// Отрисовка окна Forecast
function renderForecast(vars) {
    const forecastBlock = getDOMElement('.weather-forecast');
    forecastBlock.innerHTML = '';
    
    forecastBlock.insertAdjacentHTML('beforeend', 
    `<div class="selected-city-forecast">${vars.city}</div>`
    );

    vars.forecastList.forEach (item => {
        forecastBlock.insertAdjacentHTML('beforeend', 
            `<div class="forecast-hourly-item">
                <div class="date-time-block">
                    <div class="date">${item.date}</div>
                    <div class="time">${item.time}</div>
                </div>
                <div class="forecast-hourly-weather ">
                    <div class="forecast-hourly-weather-temp-wrapper">
                        <div class="forecast-hourly-weather-temp">
                            Temperature: ${item.temp}&#176;
                        </div>
                        <div class="forecast-hourly-weather-feels-temp">
                            Feels like: ${item.feelsLikeTemp}&#176;
                        </div>
                    </div>
                    <div class="forecast-hourly-weather-precipitation-wrapper">
                        <div class="forecast-hourly-weather-precipitation">
                            ${item.precipitation}
                        </div>
                        <div class="forecast-hourly-weather-precipitation-img">
                            <img src="${item.iconUrl}">
                        </div>
                    </div>
                </div>
            </div>`
        );
    })
    
}

// обработчик нажатия на кнопки табов
const tabsBtnsHandler = (event) => {
    if ( event.target.classList.contains('tab-item') ) {
        const btnIndex = Array.from(tabsBtn).indexOf(event.target);

        tabsBtn.forEach(tab => tab.classList.remove('active-tab'));
        Array.from(tabsBtn)[btnIndex].classList.add('active-tab');
        tabsContent.forEach(block => block.classList.add('inactive-block'));
        Array.from(tabsContent)[btnIndex].classList.remove('inactive-block');
    }
}

// обработчик формы поиска города
const searchFormHandler = (event) => {
    const city = searchCityInput.value.trim();

    try {
        event.preventDefault();
        if (!city) {
            throw new Error('Некорректное название города');      
        }
        showWeather(city);
    
    }
    catch (error){
        alert(error);
                
    }
    finally {
        searchCityForm.reset();
    }
}

// обработчик кнопки добавления избранных городов
const btnFavoriteCityHandler = () => {
    const city = weatherNowCity.textContent;
    const favList = storage.getFavList();
    if ( favList.length !== 0 && 
        storage.hasFavListCity(city) ) {
        
        removeFavoriteCity(city);
        return;
    }
    addFavoriteCities(city);
}

// добавление в список избранных городов
function addFavoriteCities(city) {
    addFavoriteCityToStorage(city);
    storage.saveFavList();
    renderFavoriteCities();
    showWeather(city);
}

// добавление избранного города в хранилище
function addFavoriteCityToStorage(city) {
    const favList = storage.getFavList();
    favList.add(city);
   
}

// отрисовка списка избранных городов
function renderFavoriteCities() {
    favoriteCitiesList.innerHTML = '';
    
    const favList = storage.getFavList();
    for (const city of favList) {
        addFavoriteCityNode(city);
    }
      
}

// создание элемента в списке избранных городов
function addFavoriteCityNode(city) {
    const favoriteCity = document.createElement('li');
    const btnDeleteCity = document.createElement('button');
    const spanCity = document.createElement('span');
    
    spanCity.textContent = city;

    spanCity.classList.add('favourite-city-span');
    favoriteCity.classList.add('favourite-cities-list-item');
    if (weatherNowCity.textContent === city ||
        storage.lastCity === city) {
        favoriteCity.classList.add('active-city');
    }
    
    btnDeleteCity.classList.add('favourite-cities-list-delete-btn');
    favoriteCity.setAttribute('data-city', city);
    
    favoriteCitiesList.append(favoriteCity);
    favoriteCity.append(spanCity);
    favoriteCity.append(btnDeleteCity);
    
    favoriteCity.addEventListener('click', favoriteCitiesListHandler);
}

// удаление города из списка избранных
function removeFavoriteCity(city) {
    deleteFavoriteCityFromStorage(city);
    renderFavoriteCities();
    showWeather(storage.lastCity);
}

// удаление города из списка избранных в хранилище
function deleteFavoriteCityFromStorage(city) {
    storage.favCities.delete(city);
    storage.saveFavList();
}

// обработка слушателя списка избранных городов
function favoriteCitiesListHandler(e) {
    const parentElement = e.target.closest('[data-city]');
    const city = parentElement.getAttribute('data-city');
    
    if ( e.target.classList.contains('favourite-cities-list-delete-btn') ) {
        removeFavoriteCity(city);
        return;
    }
    
    if ( e.target.classList.contains('favourite-cities-list-item') || 
    e.target.classList.contains('favourite-city-span') ) {
        showWeather(city);
        
        return;
    }
    
}

btnAddFavoriteCity.addEventListener('click', btnFavoriteCityHandler);

tabsBtns.addEventListener('click', tabsBtnsHandler);

searchCityForm.addEventListener('submit', searchFormHandler);



// инициализация приложения при загрузке
function init() {
    // загружаем данные из localStorage
    storage.loadFavsList();
    storage.loadLastCity();
    // отображение города по умолчанию, если нет городов в списке избранных
    const defaultCity = "Koh Pha Ngan";
    if (storage.lastCity === '') {
        showWeather(defaultCity);
    }
    // отображение последнего запрошенного города
    else {
        showWeather(storage.lastCity);
    }
    renderFavoriteCities();
}

init();