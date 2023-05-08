
function getElement(selector){
    return document.querySelector(selector);
}

const form = getElement('.weather__form');
const input = getElement('.weather__input');
const temperatureNumber = getElement('.temperature__number');
const place = getElement('.tab-block__country');

const serverData = {
    serverUrl: 'http://api.openweathermap.org/data/2.5/weather',
    apiKey: 'f660a2fb1e4bad108d6160b7f58c555f',
}

function createUrl(serverUrl, cityName, apiKey){
    return `${serverUrl}?q=${cityName}&appid=${apiKey}`;
}

async function pushData(event){
    event.preventDefault()
    const cityName = input.value;
    const url = createUrl(serverData.serverUrl, cityName, serverData.apiKey);

    const response = await fetch(url);
    const data = await response.json();

    const temperatureK = data.main.temp;
    const temperatureC = Math.ceil(temperatureK - 273.15);

    temperatureNumber.textContent = temperatureC;
    place.textContent = data.name;

    form.reset()
}

form.addEventListener('submit', pushData)
