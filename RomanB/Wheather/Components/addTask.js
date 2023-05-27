import {saveCities} from "./localStorage.js";

export const addTask = (arr,cityName) => {
    const isDuplicate = arr.filter(item => item.city.toLowerCase() === cityName.trim().toLowerCase())
    if (isDuplicate.length > 0) {
        return;
    }

    arr.push({
        city: cityName
    })

    saveCities(cities);
}