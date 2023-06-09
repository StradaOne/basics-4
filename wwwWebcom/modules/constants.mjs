
const VARIABLE_UI = {
    NOW: {
        tabs : document.querySelectorAll(".tabs__item"),
        windows : document.querySelectorAll(".weather__block"),
        form : document.querySelector(".weather__search-form"),
        input : document.querySelector(".weather__search-form-input"),
        temperature : document.querySelector(".weather__block-temp"),
        city : document.querySelector(".weather__block-content-city"),
        icon : document.querySelector('.weather__block-cloud'),
        favoriteBtn : document.querySelector('.weather__block-content-heart'),
        favoriteList : document.querySelector('.item-locations')
    },
    DETAILS: {
         city : document.querySelector('.weather__details-city'),
         temperature : document.querySelector('.temperature'),
         feels : document.querySelector('.feelslike'),
         weather : document.querySelector('.weather-sky'),
         sunrise : document.querySelector('.sunrise'),
         sunset : document.querySelector('.sunset'),
    },
    FORECAST: {
         city : document.querySelector('.weather__forecast-city'),
         date : document.querySelectorAll(".weather__forecast-block-date-datecurrent"),
         time : document.querySelectorAll('.weather__forecast-block-date-time'),
         temperature : document.querySelectorAll('.weather__forecast-block-info-temp-temperature'),
         feels : document.querySelectorAll('.weather__forecast-block-info-temp-feelslike'),
         rainfall : document.querySelectorAll('.weather__forecast-block-info-rainfall-current'),
         icon : document.querySelectorAll('.weather__forecast-block-info-rainfall-icon')
    }
}



export {VARIABLE_UI};
