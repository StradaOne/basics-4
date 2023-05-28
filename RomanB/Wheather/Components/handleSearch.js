import {sendRequest} from "./sendRequest.js";
import {handleResponse} from "./handleResponse.js";
import ErrorHandler from "./error-handling.js";

const searchFormInput = document.querySelector('.search-form__input');

const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';

export const handleSearch = async (evt) => {
    evt.preventDefault();
    const cityName = searchFormInput.value
    const url = `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`;

    try {
        const responseData = await sendRequest(url);
        handleResponse(responseData);
        console.log(handleResponse(responseData))
    } catch (error) {
        new ErrorHandler().handleServerResponseError();
    }
}