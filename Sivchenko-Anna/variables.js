export const API = {
  SERVER_URL: "http://api.openweathermap.org/data/2.5/weather",
  API_KEY: "f660a2fb1e4bad108d6160b7f58c555f",
};

export const UI_ELEMENTS = {
  FORM: document.querySelector(".search"),
  INPUT_NAME: document.querySelector(".search-input"),
  BTN_FAVORITE: document.querySelector(".city-like"),
  CITIES_LIST: document.querySelector(".cities"),
};

export const WEATHER = {
  NOW: {
    CITY_NAME: document.querySelector(".city"),
    TEMPERATURE: document.querySelector(".temperature"),
    ICON: document.querySelector(".weather-icon"),
  },
  DETAILS: {
    CITY_NAME: document.querySelector(".city-details"),
    TEMPERATURE: document.querySelector(".details-temperature"),
    FEELS_LIKE: document.querySelector(".details-feels"),
    DESCRIPTION: document.querySelector(".details-weather"),
    SUNRISE: document.querySelector(".details-sunrise"),
    SUNSET: document.querySelector(".details-sunset"),
  },
};