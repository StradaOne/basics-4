const serverUrl = "https://api.openweathermap.org/data/2.5/";
const apiKey = "f6f1b811662377c12bd1cf188819bbdc";

export async function getWeatherData(cityName, option="weather") {
  const url = `${serverUrl}${option}?q=${cityName}&appid=${apiKey}&units=metric`;

  const response = await fetch(url);
  const data = await response.json();

  if (response.ok) return data;
  throw new Error(data.message);
}
