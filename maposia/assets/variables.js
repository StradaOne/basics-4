function getElement(tag) {
    return document.querySelector(tag)
}

const BUTTONS = {
    NOW: getElement('.weather-now-btn'),
    DETAILS: getElement('.weather-details-btn'),
    FORECAST: getElement('.weather-forecast-btn')

}

const DISPLAY =  {
    NOW: getElement('.weather-display-now'),
    DETAILS: getElement('.weather-display-details'),
    FORECAST: getElement('.weather-display-forecast')
}

const SEARCHFORM = {
    FORM: getElement('.form-search'),
    INPUT: getElement('.text-search')
}

const WEATHERNOW = {
    CITY: getElement('.weather_city'),
    TEMPERATURE: getElement('.temperature-now'),
    ICON: getElement('.weather-icon'),
    LIKE: getElement('.weather_like')
}

const CITIESLOCATIONS = {
    LIST: getElement('.list-locations'),
    ITEM: getElement('.item-locations'),
    DELBTN: getElement('.del-btn')
}


export {
    BUTTONS,
    DISPLAY,
    SEARCHFORM,
    WEATHERNOW,
    CITIESLOCATIONS
}