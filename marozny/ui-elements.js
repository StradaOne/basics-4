const getElement = (element) => document.querySelector(element);
const UI_ELEMENTS = {
  NOW: {
    TABS: document.querySelectorAll(".tabs__item"),
    WEATHER_BLOCK: document.querySelectorAll(".weather__block"),
    SEARCH_FORM: getElement(".weather__search-form"),
    INPUT_CITY: getElement(".weather__search-form-input"),
    TEMP: getElement(".weather__block-temp"),
    CURRENT_CITY: getElement(".weather__block-content-city"),
    CURRENT_ICON: getElement(".weather__block-cloud"),
    FAVORITE_BUTTON: getElement(".weather__block-content-heart"),
    LIST_FAV_CITIES: getElement(".list-locations"),
  },
  DETAILS: {
    CITY: getElement(".weather__details-city"),
    TIME: getElement(".time"),
    TEMPERATURE: getElement(".temperature"),
    FEELS_LIKE: getElement(".feelslike"),
    SKY: getElement(".weather-sky"),
    SUNRISE: getElement(".sunrise"),
    SUNSET: getElement(".sunset"),
  },
};

export { UI_ELEMENTS };
