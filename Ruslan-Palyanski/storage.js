
const storage = {
    saveFavoriteCities(favoriteCitiesArr){
        const favoriteCities = new Set(favoriteCitiesArr);
        localStorage.arrayCities = JSON.stringify([...favoriteCities]);
    },
    setStartCity(startCity){
        localStorage.startCity = startCity;
        document.cookie = `startCity=${startCity};max-age=360;`;
    },
    getFavoriteCities(){
        try{
            if(!localStorage.arrayCities){
                return [];
            } 
            return JSON.parse(localStorage.arrayCities)
        } catch(err){
            return console.log(err);
        }
    },
    getCurrentCity(){
        if(!localStorage.startCity){
            return 'Minsk';
        }
        return localStorage.startCity;
    }
}

export {storage};
