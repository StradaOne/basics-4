export const VARIABLES = {
	TABS: document.querySelectorAll(".tabs__item"),
	FORM_ELEMENT: document.querySelector(".weather__search"),
	WEATHER_BLOCK: document.querySelectorAll(".weather__block"),
	FORM: document.querySelector(".weather__search"),
	NOW: {
		TEMPERATURE: document.querySelector(".weather__block-temp span"),
		ICON: document.querySelector(".weather__block-icon"),
		CITY: document.querySelector(".weather__block-content-city"),
		LIKE: document.querySelector(".weather__block-content-like-path"),
	},
	DETAILS: {
		CITY:  document.querySelector(".weather__details-title"),
		TEMPERATURE: document.querySelector(".temperature"),
		FEEL_LIKE: document.querySelector(".feel"),
		WEATHER: document.querySelector(".weather-sky"),
		SUNRISE: document.querySelector(".sunrise"),
		SUNSET: document.querySelector(".sunset"),
	},
};
