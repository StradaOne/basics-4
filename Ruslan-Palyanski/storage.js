
const storage = {
    saveFavoriteCities(favoriteCities){
        localStorage.arrayCities = JSON.stringify(favoriteCities);
    },
    setStartCity(startCity){
        localStorage.startCity = startCity;
    },
    getFavoriteCities(){
        if(!localStorage.arrayCities){
            return [];
        } 
        return JSON.parse(localStorage.arrayCities)
    },
    getCurrentCity(){
        if(!localStorage.startCity){
            return 'Minsk';
        }
        return localStorage.startCity;
    }
}

export {storage};
