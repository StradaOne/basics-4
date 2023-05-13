import { weatherElems } from "./ui.js";

const favourites = [];
const activeLocation = [];

function saveToLocalStorage() {
    localStorage.setItem('locations', JSON.stringify(favourites));
};

function saveActiveCityToLocalstorage() {
    localStorage.setItem('activeLocation', JSON.stringify(activeLocation));
};

function renderFavourites(city) {
    city.forEach(city => {
        const newLocation = 
        `<div class="weather__locations-list-box" id="locationsContainer">
            <p class="weather__locations-list-text locationsName" id="locationsName">${city.name}</p>
            <span class="weather__locations-list-del nowDel" id="locationsDelete">╳</span>
        </div>`;
        weatherElems.locations.list.insertAdjacentHTML('afterbegin', newLocation)
    });
};



export {saveToLocalStorage, renderFavourites, favourites, activeLocation, saveActiveCityToLocalstorage };