import {createCitiesBlock} from "./createCitiesBlock.js";
import {deleteTask} from "./deleteTask.js";
import {loadCities} from "./localStorage.js";
import {sendRequest} from "./sendRequest.js";
import {handleResponse} from "./handleResponse.js"

const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
const cities = loadCities();

export const handleLocationsBlockClick = async (evt) => {
    const { target } = evt;
    if (target.classList.contains('locations-block__button')) {
        const closestCityName = target.closest('.locations-block__wrapper').querySelector('.locations-block__location');
        deleteTask(cities, closestCityName.textContent);
        createCitiesBlock(cities);
    }

    if (target.classList.contains('locations-block__location')) {
        const cityName = target.textContent;
        const url = `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`;

        try {
            const responseData = await sendRequest(url);
            handleResponse(responseData);
        } catch (error) {
            console.log('Ошибка:', error.message);
        }
    }
}