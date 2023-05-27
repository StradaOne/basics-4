import {saveCities} from "./localStorage.js";

export const deleteTask = (arr,cityName) => {
    const taskIndex = arr.findIndex(item => item.city === cityName);
    if (taskIndex !== -1) {
        arr.splice(taskIndex, 1);
    }

    saveCities(arr);
}