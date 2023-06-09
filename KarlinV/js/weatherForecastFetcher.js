import dotenv from "dotenv";
dotenv.config();

const serverUrlForecast = `http://api.openweathermap.org/data/2.5/forecast`;
const apiKey = process.env.API_KEY_WEATHER;
const FORECAST_NUMBER_OF_DAYS = 5;

export const getDataWeather = async (cityName) => {
  const urlForecast = `${serverUrlForecast}?q=${cityName}&cnt=${FORECAST_NUMBER_OF_DAYS}&appid=${apiKey}`;
  try {
    const response = await fetch(urlForecast);
    if (!response.ok) {
      throw new Error("Unable to fetch weather data. Please try again later.");
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};
