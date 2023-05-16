// Задача: отображение погоды для выбранного города.

import {getDOMElement, timeConverter, saveToLocalStorage, loadFromLocalStorage} from './utils.js'

const tabsContent = document.querySelectorAll('.tabs-content-item');
const tabsBtn = document.querySelectorAll('.tab-item');
const tabsBtns = getDOMElement('.tabs');
const searchCityInput = getDOMElement('.weather-search-form-input');
const searchCityForm = getDOMElement('.weather-search-form');
const weatherNowCity = getDOMElement('.selected-city-now');
const btnAddFavoriteCity = getDOMElement('.favorite-btn');
const favoriteCitiesList = getDOMElement('.favourite-cities-list');

const storage = {
    favCities: [],
    lastCity: '',
    
    getFavList: function (){
        return storage.favCities;
    },
    loadFavsList: function(){
        if ( loadFromLocalStorage('favCities') ) {
            const localStorage = loadFromLocalStorage('favCities');
            storage.favCities = localStorage;
        }
    },
    loadLastCity: function() {
        if ( loadFromLocalStorage('lastCity') ) {
            const localStorage = loadFromLocalStorage('lastCity');
            storage.lastCity = localStorage;
        }
    },
    saveFavList: function(){
        saveToLocalStorage('favCities', storage.favCities);        
    },
    saveLastCity: function () {
        saveToLocalStorage('lastCity', storage.lastCity); 
    },
    hasFavListCity: function(city){
        return storage.favCities.includes(city);
    },
};

// отображение информации
async function showWeather(city) {
    try {
        // получение данных с сервера
        const data = await fetchNowWeather(city);
       
        // подготовка необходимых данных
        const vars = process(data);
        
        // сохранение последнего загруженного города в локал сторедж
        storage.saveLastCity();
        
        // изменение цвета города вкладки now
        weatherNowCity.style.color = 'black';
        // отрисовка данных
        render(vars);
    }
    catch (e) {
        
        console.log(e);
    }
    
}

// получение данных от api
async function fetchNowWeather(city) {
    try {
        const ServerUrl = 'http://api.openweathermap.org/data/2.5/weather';
        const apiKey = '8b70971e38e651a72781439cafacf538';
        const url = `${ServerUrl}?q=${city}&appid=${apiKey}&units=metric`;

        const respons = await fetch(url);
        if (respons.ok) {          
            const data = await respons.json();
            return data;           
        } else {
            throw new Error((await respons.json()).message);
        }
    } catch (error) {
        // обработка ошибки не найденного города отдельно
        if (error.message === 'city not found') {
            formSetError(city);
            return;
        }
        alert('Error: '+ error.message);
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
    alert('Такой город не найден');
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
    vars.iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
    vars.feelsLikeTemp = Math.round(data.main.feels_like);
    vars.precipitation = data.weather[0].main;
    vars.timeZone = data.timezone;
    vars.sunrise = timeConverter(data.sys.sunrise, vars.timeZone);
    vars.sunset = timeConverter(data.sys.sunset, vars.timeZone);
    storage.lastCity = vars.city;
            
    return vars;
}

// отрисовка данных
function render(vars) {
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
        alert('Error: '+ error);
                
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
    favList.push(city);
   
}

// отрисовка списка избранных городов
function renderFavoriteCities() {
    favoriteCitiesList.innerHTML = '';
    
    const favList = storage.getFavList();
    favList.forEach(city => addFavoriteCityNode(city));
  
}

// создание элемента в списке избранных городов
function addFavoriteCityNode(city) {
    const favoriteCity = document.createElement('li');
    const btnDeleteCity = document.createElement('button');
    const spanCity = document.createElement('span');
    
    spanCity.textContent = city;

    spanCity.classList.add('favourite-city-span');
    favoriteCity.classList.add('favourite-cities-list-item');
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
    const favList = storage.getFavList();
    storage.favCities = favList.filter(c => c !== city);
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
