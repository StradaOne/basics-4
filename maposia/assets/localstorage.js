
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

export default storage