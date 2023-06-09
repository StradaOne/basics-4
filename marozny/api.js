const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
const apiKey = 'afc9f2df39f9e9e49eeb1afac7034d35';

export async function getData(cityName) {
  try {
    const url = `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error((await response.json()).message);
    }
  } catch (error) {
    alert(error);
  }
}
