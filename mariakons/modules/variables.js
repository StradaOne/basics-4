const VARIABLES = {
   MAIN:{
       searchForm: document.querySelector('.weather__search-form'),
       tabs: document.querySelectorAll('.tabs__item'),
       weatherBlock: document.querySelectorAll('.weather__block'),
   },
   NOW:{
          nowCityName:  document.querySelector('.weather__block-content-city'),
          nowCityTemp:  document.querySelector('.weather__block-temp span'),
          nowIcon:  document.querySelector('.weather__block-cloud'),
   },

   DETAILS:{
       detailsCity: document.querySelector('.weather__details-city'),
       detailsTemp: document.querySelector('.temperature'),
       detailsFeels: document.querySelector('.feelslike'),
       detailsWeather: document.querySelector('.weather-sky'),
       detailsSunrise: document.querySelector('.sunrise'),
       detailsSunset: document.querySelector('.sunset'),
   },
   FAVORITES:{
      containter: document.querySelector('.container-right__city-names'),
      like: document.querySelector('.weather__block-content-heart'),      
   },
   FORECAST:{
     forecastCityName: document.querySelector('.weather__forecast-city'),
     weatherForecast: document.querySelector('.weather__forecast'),
   }
}
export {VARIABLES};