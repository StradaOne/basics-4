//------------------------<elements for working with 'now'>--------
const tabs = document.querySelectorAll(".tabs__item");
const windows = document.querySelectorAll(".weather__block");
const form = document.querySelector(".weather__search-form");
const input = document.querySelector(".weather__search-form-input");
const temperature = document.querySelector(".weather__block-temp");
const city = document.querySelector(".weather__block-content-city");
const icon = document.querySelector('.weather__block-cloud')
const favoriteBtn = document.querySelector('.weather__block-content-heart')
const favoriteList = document.querySelector('.item-locations')

//------------------------<elements for working with 'details'>--------
const detailsCity = document.querySelector('.weather__details-city')
const detailsTemperature = document.querySelector('.temperature')
const detailsFeels = document.querySelector('.feelslike')
const detailsWeather = document.querySelector('.weather-sky')
const detailsSunrise = document.querySelector('.sunrise')
const detailsSunset = document.querySelector('.sunset')


//------------------------<elements for working with 'forcast'>--------
const forecastCity = document.querySelector('.weather__forecast-city')
const forecastDate = document.querySelectorAll(".weather__forecast-block-date-datecurrent")
const forecastTime = document.querySelectorAll('.weather__forecast-block-date-time')
const forecastTemperature = document.querySelectorAll('.weather__forecast-block-info-temp-temperature')
const forecastFeels = document.querySelectorAll('.weather__forecast-block-info-temp-feelslike')
const forecastRainfall = document.querySelectorAll('.weather__forecast-block-info-rainfall-current')
const forecastIcon = document.querySelectorAll('.weather__forecast-block-info-rainfall-icon')



const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f'

export { tabs, windows, form, input, temperature, city, apiKey, icon, favoriteBtn, favoriteList, detailsCity, detailsTemperature, detailsFeels, detailsWeather, detailsSunrise, detailsSunset, forecastCity,forecastDate,forecastTime,forecastTemperature,forecastFeels,forecastRainfall,forecastIcon };
