const tabs = document.querySelectorAll(".tabs__item");
const windows = document.querySelectorAll(".weather__block");
const form = document.querySelector(".weather__search-form");
const input = document.querySelector(".weather__search-form-input");
const temperature = document.querySelector(".weather__block-temp");
const city = document.querySelector(".weather__block-content-city");
const icon = document.querySelector('.weather__block-cloud')
const favoriteBtn = document.querySelector('.weather__block-content-heart')
const favoriteList = document.querySelector('.item-locations')

const listOfCities = []


const serverUrl = "http://api.openweathermap.org/data/2.5/weather"
const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f'

export { tabs, windows, form, input, temperature, city, serverUrl, apiKey, icon, favoriteBtn, favoriteList, listOfCities};
