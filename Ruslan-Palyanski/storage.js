
const storage = {
    saveFavoriteCities(favoriteCities){
        const data = JSON.stringify(favoriteCities);
        localStorage.arrayCities = data;
    },
    setStartCity(startCity){
        localStorage.startCity = startCity;
    },
    getFavoriteCities(){
        let data;
        if(!localStorage.arrayCities){
            data = [];
        } else {
            data = JSON.parse(localStorage.arrayCities)
        }
        return data;
    },
    getCurrentCity(){
        return localStorage.startCity;
    }
}

export {storage};
