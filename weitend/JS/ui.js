const tabs = document.querySelectorAll('.tab');
const tabsBlocks = document.querySelectorAll('.weather__content-info-wrapper');
const input = document.querySelector('.weather__search-input');
const form = document.querySelector('.weather__form');
const weatherElems = {
    now: {
        temp: document.querySelector('#nowTemp'),
        name: document.querySelector('#nowName'),
        icon: document.querySelector('#nowIcon'),
        like: document.querySelector('.nowLike'),
    },
    details: {
        name: document.querySelector('#detailsName'),
        temp: document.querySelector('#detailsTemp'),
        feelsLike: document.querySelector('#detailsFeelsLike'),
        weatherName: document.querySelector('#detailsWeather'),
        sunrise: document.querySelector('#detailsSunrise'),
        sunset: document.querySelector('#detailsSunset'),
    },
    locations: {
        list: document.querySelector('#locationsList'),
        container: document.querySelector('#locationsContainer'),
        delete: document.querySelector('#locationsDelete'),
        name: document.querySelector('#locationsName'),
    }
};

export { tabs, tabsBlocks, input, form, weatherElems };