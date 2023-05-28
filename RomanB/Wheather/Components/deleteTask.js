import {saveCities} from "./localStorage.js";

export const deleteTask = (citiesSet,cityName) => {
    const task = Array.from(citiesSet).find(item => item.city === cityName);
    if (task) {
        citiesSet.delete(task);
        saveCities(Array.from(citiesSet));
    }
}