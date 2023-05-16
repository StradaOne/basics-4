import { tabs, tabsBlocks, weatherElems } from "./ui.js";
import { favourites } from "./main.js";
function tabsBtnsHandler(e) {
    if (e.target.classList.contains('tab')) {
        const tabIdx = Array.from(tabs).indexOf(e.target);
        const tabsSort = Array.from(tabs).filter(tab => tab !== tabs[tabIdx]);

        Array.from(tabsSort).forEach(tab => tab.classList.remove('on-tab'));
        tabs[tabIdx].classList.add('on-tab');

        tabsBlocks.forEach(item => item.classList.add('hide'));
        tabsBlocks[tabIdx].classList.remove('hide');
    };
};

function saveToLocalStorage() {
    localStorage.setItem('location', JSON.stringify(favourites))
};

function addToFavourite(e) {
    if (e.target.classList.contains('nowLike')) {
        const node = `
        <div class="weather__locations-list-box" id="locationsContainer">
            <p class="weather__locations-list-text" id="locationsName">${weatherElems.now.name.textContent}</p>
            <span class="weather__locations-list-del nowDel" id="locationsDelete">❌</span>
        </div>
            `;

        weatherElems.locations.list.insertAdjacentHTML('afterbegin', node);
        favourites.push({ name: weatherElems.now.name.textContent });
        saveToLocalStorage();
    };
};

function deleteFromFavourite(e) {
    if (e.target.classList.contains('nowDel')) {
        const parentNode = e.target.closest('#locationsContainer');
        parentNode.remove();

        const name = parentNode.querySelector('#locationsName').textContent;
        const nameIdx = favourites.findIndex(c => c.name === name);

        favourites.splice(nameIdx, 1)
        saveToLocalStorage();
        return
    }
};

function renderFavourites(city) {
    city.forEach(city => {
        const newLocation = 
        `<div class="weather__locations-list-box" id="locationsContainer">
            <p class="weather__locations-list-text locationsName" id="locationsName">${city.name}</p>
            <span class="weather__locations-list-del nowDel" id="locationsDelete">❌</span>
        </div>`;
        weatherElems.locations.list.insertAdjacentHTML('afterbegin', newLocation)
    });
};

async function renderDataFromFavourites(e) {
    if (e.target.classList.contains('locationsName')) {
        const data = await getData(e.target.textContent);
        renderData(data)
    }
};

function timeConverter(unixTime) {
    const time = new Date(unixTime * 1000);

    const hours = time.getHours();
    const minutes = time.getMinutes();

    return `${hours}:${minutes}`;
};

function tempConverter(kel) {
    return Math.floor(kel - 273);
};

async function getData(name) {
    const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
    const cityName = name;
    const apiKey = 'afc9f2df39f9e9e49eeb1afac7034d35';
    const url = `${serverUrl}?q=${cityName}&appid=${apiKey}`;
    try {
        const data = await fetch(url)
            .then(res => res.json())
        if ((data.message)) {
            throw new Error('Название города введено неправильно');
        } else {
            return data;
        };
    } catch (err) {
        alert(err)
    }
};

async function renderData(data) {
    const weatherName = data.weather[0].main;
    const temp = tempConverter(data.main.temp);
    const name = data.name;
    const feelsLike = tempConverter(data.main.feels_like);
    const sunrise = timeConverter(data.sys.sunrise);
    const sunset = timeConverter(data.sys.sunset);
    const idIcon = data.weather[0].icon;
    const iconSrc = `https://openweathermap.org/img/wn/${idIcon}@2x.png`;

    weatherElems.now.temp.textContent = temp;
    weatherElems.now.name.textContent = name;
    weatherElems.now.icon.src = iconSrc;

    weatherElems.details.name.textContent = name;
    weatherElems.details.temp.textContent = temp;
    weatherElems.details.feelsLike.textContent = feelsLike;
    weatherElems.details.weatherName.textContent = weatherName;
    weatherElems.details.sunrise.textContent = sunrise;
    weatherElems.details.sunset.textContent = sunset;
};

export { tabsBtnsHandler, renderData, getData, addToFavourite, deleteFromFavourite, saveToLocalStorage, renderFavourites, renderDataFromFavourites };