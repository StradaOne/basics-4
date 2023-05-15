const tabs = document.querySelectorAll('.tabs__item');
const weatherBlock = document.querySelectorAll('.weather__block');
const weatherTemp = document.querySelector('.weather__block-temp');
const weatherInputSearch = document.querySelector('.weather__search-form-input');
const weatherIcon = document.querySelector('.weather__block-cloud');
const nameCity = document.querySelector('.weather__block-content-city');
const favoritesBtn = document.querySelector('.weather__block-content-heart');
const cityItems = document.querySelector('.list__city-items');
const keyAPI = 'afc9f2df39f9e9e49eeb1afac7034d35';
const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
const form = document.querySelector("form");
let listCity = new Array();
let cityLastRequest = '';



tabs.forEach((tab, index) => {
	tab.addEventListener('click', () => {
		tabs.forEach(t => t.classList.remove('active'))
		weatherBlock.forEach(w => w.classList.remove('active'))
		tab.classList.add('active')
		weatherBlock[index].classList.add('active')
	})
})

const serverUrlAPI = 'http://api.openweathermap.org/data/2.5/weather';

// LocalStorage START 

function saveLocalStorageLastRequest () {
    //localStorage.clear();
    localStorage.setItem('cityLastRequest',JSON.stringify(cityLastRequest));
}

function saveLocalStorageListCity() {
    localStorage.setItem('listCity', JSON.stringify(listCity));
}

function showLocalStorage(){
    console.log('Данные из showLocalStorage ');
    for(let i=0; i<localStorage.length; i++) {
        let key = localStorage.key(i);
        console.log(`${key}: ${localStorage.getItem(key)}`);
      }
}

function loadLocalStorage () {
    localStorageFestStart ();
    cityLastRequest = JSON.parse(localStorage.getItem('cityLastRequest'));
    listCity = JSON.parse(localStorage.getItem('listCity'));
    console.log('данные из loadLocalStorage > ',cityLastRequest);
}

function localStorageFestStart () {
    if (!localStorage.getItem('cityLastRequest')) localStorage.setItem('cityLastRequest', JSON.stringify(cityLastRequest));
    if (!localStorage.getItem('listCity')) localStorage.setItem('listCity', JSON.stringify(listCity));
}

// LocalStorage END

// Checking start
function checkingEnteredName (name) {
    if (name == '') {
        alert ('city empty');
        return false;
    } else return true;
}

// Checking end

async function fetchDataWeather (nameCity) {
    try {
        const url = `${serverUrlAPI}?q=${nameCity}&units=metric&appid=${keyAPI}`;
        const response = await fetch(url);
        if (!response.ok) {
            const data = await response.json();
            alert(data.message);
            console.error('Ошибка:', data.message);
            return false;
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Ошибка ', error);
    }    

}

//saveLocalStorageLastRequest ();
//saveLocalStorageListCity()
loadLocalStorage ();
loadListCity ();
loadLastRequestCity ();
//showLocalStorage();

form.addEventListener ('submit', (event) => {
    event.preventDefault();
    start();
})

favoritesBtn.addEventListener('click',eventAddDellFavoritesCity);

function eventAddDellFavoritesCity() {
    if (listCity.includes(cityLastRequest)) {
        deleteCityArray(cityLastRequest);
        deleteCityUi(cityLastRequest);
    }else addListCityUi ();
}

function deleteCityUi (name) {
    
    let cities = document.querySelectorAll('.list__city-item');
    for (const city of cities) {
        if (city.childNodes[0].textContent === name) {
            city.remove();
            setIconFavoriteCity (name);
        }
    }
}

function addListCityUi () {
    if (!addListCityArray(nameCity.textContent)) {
        return false;
    }
        cityItems.prepend(createUiCity (nameCity.textContent));
        setIconFavoriteCity(nameCity.textContent);
}

function createUiCity (name) {
    let cityUi = document.createElement('div');
    cityUi.className = 'list__city-item';
    cityUi.textContent = name;
    cityUi.addEventListener("click", () => {
        if (!loadWeatherCity(name)) return false;
        cityLastRequest = name;
        saveLocalStorageLastRequest();
        setIconFavoriteCity(name);
	});
    let btnDelete = document.createElement('button');
    btnDelete.textContent = ' X ';
    btnDelete.addEventListener('click', (event) => {
        event.stopPropagation();
        deleteCityArray(name);
        cityUi.remove();
    })
    cityUi.append(btnDelete);
    return cityUi;
}

async function loadWeatherCity (name) {
    const data = await fetchDataWeather(name);
    if (!data) return false;
    createAddingUiNow(data);
    createAddingUiDetails(data);
    setIconFavoriteCity (data.name);
    console.log()
    return true;
}

async function start () {
    if (!checkingEnteredName(weatherInputSearch.value)) return false;
    if (!await loadWeatherCity(weatherInputSearch.value)) return false;
    cityLastRequest = weatherInputSearch.value;
    setIconFavoriteCity(nameCity.textContent);
    weatherInputSearch.value = '';
    saveLocalStorageLastRequest();
}

function loadListCity () {
    for(let city of listCity) {
        cityItems.prepend(createUiCity(city));
    }
}

function loadLastRequestCity () {
    if (cityLastRequest) {
        loadWeatherCity(cityLastRequest);
        return true;
    } else return false;
}

function createAddingUiNow (data) {
    nameCity.textContent = data.name;
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
	weatherTemp.textContent = data.main.temp.toFixed(1)+'°';
}

function createUiLI (name, value, className = 'list__items') {
    let element = document.createElement('li');
    element.className = className;
    element.textContent = `${name}: ${value}`;
    return element;
}

function createAddingUiDetails (data) {
    let listUi = document.createElement('ul');
    listUi.className = 'list';
    let weatherDetailsName = createUiLI(data.name, '');
    let temperature = createUiLI('Temperature', data.main.temp);
    let feelsLike = createUiLI('Feels like', data.main.feels_like);
    let weather = createUiLI('Weather', data.weather[0].description);
    let sunrise = createUiLI('Sunrise', formattedTime(data.sys.sunrise)); 
    let sunset = createUiLI('Sunset', formattedTime(data.sys.sunset));  
    listUi.append(weatherDetailsName,temperature,feelsLike,weather,sunrise,sunset);
    document.querySelector('.weather__details').innerHTML='';
    document.querySelector('.weather__details').append(listUi);
    console.log('лист из createUiDetails > ',listUi);
}

function formattedTime (time) {
    const date = new Date(time * 1000);
    const hours = date.getHours();
    let minutes = date.getMinutes();
    minutes = (minutes < 10) ? '0'+ minutes : minutes;
    return `${hours}:${minutes}`;
}

// Array Start
 
function addListCityArray (name){
    if (listCity.includes(name)) return false;
    listCity.push(name);
    saveLocalStorageListCity()
    return true;
}

function deleteCityArray (name){
    const indexDelete = listCity.findIndex ((value)=> value == name);
    if (indexDelete === -1) {
        console.log ('ERROR.DELITION > ',indexDelete );
        return false;
    }
    listCity.splice(indexDelete,1);
    saveLocalStorageListCity()
    return true;
}

// Array END

function setIconFavoriteCity (name) {
    if (listCity.includes(name)) document.querySelector('.FavoriteCity').src = './assets/svg/ShapeF.svg';
    else document.querySelector('.FavoriteCity').src = './assets/svg/Shape.svg';
}