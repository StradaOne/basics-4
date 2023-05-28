import {saveCities} from "./localStorage.js";

function City (name) {
    this.city = name
}

export const addTask = (cities, cityName) => {
    const isDuplicate = [...cities].find(item => {
        console.log(item.city)
        console.log(cityName.trim())
        return item.city.toLowerCase() === cityName.trim().toLowerCase()
    });
    if (isDuplicate) {
        return;
    }

    cities.add(new City(cityName));
    saveCities(Array.from(cities));
};

