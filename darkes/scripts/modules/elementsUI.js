const getElement = (css) => document.querySelector(css);
const getElements = (css) => document.querySelectorAll(css);

const ELEMENTS = {
      MAIN_CITIES: document.querySelectorAll('.main-info__town-name'),
      MAIN_CITY: getElement('.main-info__town-name'),
      MAIN_IMG: getElement('.main-info__absolute-img'),
      LIKE_CITIES: getElement('.right__bottom-town-list'),
      FORM: getElement('.header-container'),
      INPUT: getElement(".header__input"),
      TEMP: getElement(".main-info__degree"),
      BUTTON: {
            LIKE_BTN: getElement('.add-favorite-town'),
            SVG_COLOR: getElement('.svg-color'),
      },
      DETAILS: {
            TEMPERATURE: getElement('.temperature'),
            FEELS_LIKE: getElement('.feels-like'),
            WEATHER: getElement('.weather'),
            SUNRISE: getElement('.sunrise'),
            SUNSET: getElement('.sunset'),
      },
      FORECAST: {
            DAY: getElements('.forecast-day'),
            TIME: getElements('.forecast-time'),
            TEMPERATURE: getElements('.temperature'),
            FEELS_LIKE: getElements('.feels-like-forecast'),
            TYPE_WEATHER: getElements('.type-of-weather'),
            TYPE_IMG: getElements('.type-img-of-weather')
      },
};

export { ELEMENTS };