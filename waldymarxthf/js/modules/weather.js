import { getWeatherData } from "./api.js";
import { errorHandler } from "./utils.js";
import { showLoader, hideLoader } from "./preloader.js";
import { VARIABLES } from "./ui-variables.js";
import {
	updateBlockNow,
	updateBlockDetails,
	updateBlockForecast,
} from "./ui.js";

export async function updateWeather(location) {
	showLoader();
	try {
		const [forecastData, weatherData] = await Promise.all([
			getWeatherData("forecast", location),
			getWeatherData("weather", location),
		]);

		await updateBlockNow(weatherData);
		await updateBlockDetails(weatherData);
		await updateBlockForecast(forecastData);

		VARIABLES.FORM[0].placeholder = VARIABLES.NOW.CITY.textContent;
	} catch (error) {
		errorHandler(error);
	} finally {
		setTimeout(hideLoader, 250);
	}
}

//* функция которая получает данные и вызывает функции обновление блоков