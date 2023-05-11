const favoriteListCities = JSON.parse(localStorage.getItem('favoriteCities')) || []
let currentCity = JSON.parse(localStorage.getItem('currentCity')) || 'Укажите город'

const storage = {
    saveFavoriteCities: function (favoriteCities) {
        localStorage.setItem('favoriteCities', JSON.stringify(favoriteCities))
    },
    saveCurrentCity: function (city){
        localStorage.setItem('currentCity', JSON.stringify(city))
    },
    getCurrentCity: function (){
       const getCity = localStorage.getItem('currentCity')
        return JSON.parse(getCity)
    },
    getFavoriteCities: function (){
        const getList = localStorage.getItem('favoriteCities')
        return JSON.parse(getList)
    }

}

export {favoriteListCities, currentCity, storage}