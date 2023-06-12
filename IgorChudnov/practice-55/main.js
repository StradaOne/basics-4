const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
const serverUrlForecast = 'http://api.openweathermap.org/data/2.5/forecast';
const apiKey = 'f92bdae653a2880855efc1d9b19b713f';

const temp = document.getElementById('temp');
const city = document.getElementById('city');
const inputForm = document.getElementById('search');
const cityInput = document.getElementById('input');
const searchBut = document.getElementById('searchBut');
const weatherIcon = document.getElementById('weatherIcon');
const buttonNow = document.getElementById('buttonNow');
const buttonDetails = document.getElementById('buttonDetails');
const buttonForecast = document.getElementById('buttonForecast');
const displayNow = document.getElementById('displayNow');
const displayDetails = document.getElementById('displayDetails');
const displayForecast = document.getElementById('displayForecast');
const cityDetails = document.getElementById('cityDetails');
const tempDetails = document.getElementById('tempDetails');
const feelsDetails = document.getElementById('feelsDetails');
const weatherDetails = document.getElementById('weatherDetails');
const sunriseDetails = document.getElementById('sunriseDetails');
const sunsetDetails = document.getElementById('sunsetDetails');
const addFavorite = document.querySelector('#addFavorite');
const theList = document.querySelector('#favList');
let cityForList;
let cityTimeZone;
let favList = new Array;
let FAVLIST = {};
let gui = JSON.parse(localStorage.getItem('favoriteList'));
console.log(gui);

// Метод выведения месяца но его номеру
function monthName(number){
    const monthArray = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return monthArray[number];
};

// Действие по клику на сохраненный город
function cityClick(favCity){
    cityName = favCity;
    url = `${serverUrl}?q=${cityName}&appid=${apiKey}`;
    urlForecast = `${serverUrlForecast}?q=${cityName}&appid=${apiKey}`;
    weatherRequest(url);
    forecastRequest(urlForecast);
};

function addToFavorite(key){
    FAVLIST.favoriteList[key] = key;
    localStorage.setItem('favoriteList', JSON.stringify(FAVLIST.favoriteList));
    favListRender();
};
function removeFromFavorite(key){
    delete FAVLIST.favoriteList[key];
    localStorage.setItem('favoriteList', JSON.stringify(FAVLIST.favoriteList));
    favListRender();
};



//Метод сохранения по клику на сердце
function clickFavorite(){
    if (favList.includes(cityForList)) {
        removeFromFavorite(cityForList);
    } else {
        addToFavorite(cityForList);
    };
};

// Метод создания пункта в списке
function favListCreate(favCity){
    let listItem = document.createElement('li');
    listItem.classList.add('listItem')
    listItem.innerText = favCity;
    theList.insertBefore(listItem, theList.firstChild);
    listItem.addEventListener('click', ()=>{cityClick(favCity)});
    let itemCross = document.createElement('button');
    itemCross.classList.add('itemCross');
    itemCross.setAttribute('id','itemCross');
    listItem.appendChild(itemCross);
    itemCross.addEventListener('click', ()=>{removeFromFavorite(favCity);})
};

// Метод рендера всего списка
function favListRender(){
    theList.innerHTML = '';
    FAVLIST['favoriteList'] = JSON.parse(localStorage.getItem('favoriteList'));
    if (FAVLIST.favoriteList == null){
        FAVLIST.favoriteList = {};
    };
    favList = Object.keys(FAVLIST['favoriteList']);

    favList.forEach(element => {
        favListCreate(element);
    });

    if (favList.includes(cityForList)){
        addFavorite.classList.add('favoriteActive');
    } else {
        addFavorite.classList.remove('favoriteActive');
    };
};


function sendRequest(url){
    return fetch(url).then(response => {
        return response.text();
    })
    .catch(console.error);
};

function addWindow(button, display){
    button.classList.add('buttonActive');
    display.classList.add('displayActive');
};
function removeWindow(button, display) {
    button.classList.remove('buttonActive');
    display.classList.remove('displayActive');
};


function createBadge(object){
    // Контейнер для прогноза
    let forecastBadge = document.createElement('div');
    forecastBadge.classList.add('forecastBadge');
    forecastBadge.setAttribute('id', 'forecastBadge');
    displayForecast.appendChild(forecastBadge);
    // День прогноза
    let forecastDay = document.createElement('div');
    forecastDay.classList.add('forecastDay');
    forecastDay.setAttribute('id', 'forecastDay');
    forecastDay.innerText = `${object.dayForecast} ${object.monthForecast}`;
    forecastBadge.appendChild(forecastDay);
    // Время прогноза
    let forecastTime = document.createElement('div');
    forecastTime.classList.add('forecastTime');
    forecastTime.setAttribute('id', 'forecastTime');
    forecastTime.innerText = `${object.timeForecast}`;
    forecastBadge.appendChild(forecastTime);
    // Температура прогноза
    let forecastTemp = document.createElement('div');
    forecastTemp.classList.add('forecastTemp');
    forecastTemp.setAttribute('id', 'forecastTemp');
    forecastTemp.innerText = `Temperature: ${object.tempForecast}°C`;
    forecastBadge.appendChild(forecastTemp);
    // Ощущаемая температура прогноза
    let forecastFeels = document.createElement('div');
    forecastFeels.classList.add('forecastFeels');
    forecastFeels.setAttribute('id', 'forecastFeels');
    forecastFeels.innerText = `Feels like: ${object.feelsForecast}°C`;
    forecastBadge.appendChild(forecastFeels);
    // Погодные условия
    let forecastWeather = document.createElement('div');
    forecastWeather.classList.add('forecastWeather');
    forecastWeather.setAttribute('id', 'forecastWeather');
    forecastWeather.innerText = `${object.weatherForecast}`;
    forecastBadge.appendChild(forecastWeather);
    // Иконка погодных условий
    let forecastIcon = document.createElement('img');
    forecastIcon.classList.add('forecastIcon');
    forecastIcon.setAttribute('id', 'forecastIcon');
    forecastIconUrl = `https://openweathermap.org/img/wn/${object.iconForecast}.png`;
    forecastIcon.setAttribute('src',forecastIconUrl);
    forecastBadge.appendChild(forecastIcon);
}
function localTime(time) { 
    return time.toLocaleTimeString([], { 
        hour: "2-digit", 
        minute: "2-digit", 
        timeZone: "UTC", 
    }); 
}
async function weatherRequest(url) {
    sendRequest(url).catch(console.error)
        .then(data => {
            response = JSON.parse(data);
            temperature = response.main.temp - 273;
            feelsLike = response.main.feels_like - 273;
            country = response.sys.country;
            temp.innerText = Math.ceil(temperature);
            city.innerText = `${response.name}, ${country}`;
            cityForList = response.name;

            // console.clear();
            // console.log(response);

            iconCode = response.weather[0].icon;
            weatherIconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
            weatherIcon.setAttribute('src', weatherIconUrl);
            cityEnter();

            cityTimeZone = response.timezone;
            cityDetails.innerText = city.innerText;
            tempDetails.innerText = `${Math.ceil(temperature)}°C`;
            feelsDetails.innerText = `${Math.ceil(feelsLike)}°C`;
            weatherDetails.innerText = JSON.parse(data).weather[0].main;
            snr = new Date((response.sys.sunrise+cityTimeZone)*1000);
            sns = new Date((response.sys.sunset+cityTimeZone)*1000);
            sunriseDetails.innerText = localTime(snr);
            sunsetDetails.innerText = localTime(sns);

            localStorage.setItem('currentCity', cityForList);
            favListRender();
        })
        .catch(console.error);
};

function objectConvert(object, number){
    listOfDay = JSON.parse(object).list[number];
    timeOfDay = new Date((listOfDay.dt+cityTimeZone)*1000);
    dayForecast = timeOfDay.getDate();
    monthForecast = monthName(timeOfDay.getMonth());
    timeForecast = localTime(timeOfDay);
    tempForecast = `${Math.ceil(listOfDay.main.temp - 273.15)}`;
    feelsForecast = `${Math.ceil(listOfDay.main.feels_like - 273.15)}`;
    weatherForecast = listOfDay.weather[0].main;
    iconForecast = `${listOfDay.weather[0].icon}`;

    return {
        dayForecast,
        monthForecast,
        timeForecast,
        tempForecast,
        feelsForecast,
        weatherForecast,
        iconForecast,
    };
};

function forecastRender(data){
    // Очищаем экран прогноза
    displayForecast.innerHTML = '';
    // Заголовок
    let cityForecast = document.createElement('div');
    cityForecast.classList.add('cityDetails');
    cityForecast.setAttribute('id', 'cityForecast');
    displayForecast.appendChild(cityForecast);
    cityForecast.innerText = city.innerText;
    // Создаем карточки с прогнозом 10 раз
    for (i=0;i<10;i++) {
        createBadge(objectConvert(data, i));
    };
}

async function forecastRequest(url) {
    sendRequest(url).catch(console.error)
        .then(data => {
            if (JSON.parse(data).cod !== '404'){
                forecastRender(data);
            } else {
                cityWrong();
            };
        })
        .catch(console.error);
};

function cityWrong(){
    cityInput.value = '';
    cityInput.style.setProperty('--placeholder','red');
    cityInput.setAttribute('placeholder','City does not exist! Enter correct city!');
};
function cityEmpty(){
    cityInput.value = '';
    cityInput.style.setProperty('--placeholder','red');
    cityInput.setAttribute('placeholder','Empty request! Enter the city!');
};
function cityEnter(){
    cityInput.value = '';
    cityInput.style.setProperty('--placeholder','grey');
    cityInput.setAttribute('placeholder','Enter the city');
};
function clickEvent(e){
    e.preventDefault();
    cityName = cityInput.value;
    if (cityName === ''){
        cityEmpty();
        return;
    };
    url = `${serverUrl}?q=${cityName}&appid=${apiKey}`;
    urlForecast = `${serverUrlForecast}?q=${cityName}&appid=${apiKey}`;
    weatherRequest(url);
    forecastRequest(urlForecast);
};

// Город при запуске приложения
let cityName = localStorage.getItem('currentCity');
if (cityName == undefined){
    cityName = 'Istanbul';
    cityForList = cityName;
};
let url = `${serverUrl}?q=${cityName}&appid=${apiKey}`;
let urlForecast = `${serverUrlForecast}?q=${cityName}&appid=${apiKey}`;
weatherRequest(url);
forecastRequest(urlForecast);

// Кнопки переключения экранов
buttonNow.addEventListener('click', ()=>{
    addWindow(buttonNow, displayNow);
    removeWindow(buttonDetails, displayDetails);
    removeWindow(buttonForecast, displayForecast);
});
buttonDetails.addEventListener('click', ()=>{
    addWindow(buttonDetails, displayDetails);
    removeWindow(buttonNow, displayNow);
    removeWindow(buttonForecast, displayForecast);
});
buttonForecast.addEventListener('click', ()=>{
    addWindow(buttonForecast, displayForecast);
    removeWindow(buttonNow, displayNow);
    removeWindow(buttonDetails, displayDetails);
});

// Кнопка поиска
searchBut.addEventListener('click', clickEvent);

// Кнопка добавления города
addFavorite.addEventListener('click', clickFavorite);