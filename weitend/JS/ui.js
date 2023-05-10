const tabs = document.querySelectorAll('.tab');
const tabsBlocks = document.querySelectorAll('.weather__content-info-wrapper');
const input = document.querySelector('.weather__search-input');
const form = document.querySelector('.weather__form');
const weatherElems = {
    now: {
        temp: document.querySelector('#nowTemp'),
        name: document.querySelector('#nowName'),
        icon: document.querySelector('#nowIcon')
    },
    details: {
        name: document.querySelector('#detailsName'),
        temp: document.querySelector('#detailsTemp'),
        feelsLike: document.querySelector('#detailsFeelsLike'),
        weatherName: document.querySelector('#detailsWeather'),
        sunrise: document.querySelector('#detailsSunrise'),
        sunset: document.querySelector('#detailsSunset'),
    },
};

export { tabs, tabsBlocks, input, form, weatherElems };