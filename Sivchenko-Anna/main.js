const API = {
  SERVER_URL: "http://api.openweathermap.org/data/2.5/weather",
  API_KEY: "f660a2fb1e4bad108d6160b7f58c555f",
};

const form = document.querySelector(".search");
const cityName = document.querySelector(".search-input");

const outCityName = document.querySelector(".city");
const temperature = document.querySelector(".temperature");
const weatherIcon = document.querySelector(".weather-icon");;


async function getWeather() {
  try {
    const city = cityName.value;
    const url = `${API.SERVER_URL}?q=${city}&appid=${API.API_KEY}&units=metric`;

    let response = await fetch(url);
    if (response.ok) {
      let data = await response.json();
      setWeather(data);
    } else {
      throw new Error("Введите верное название города");
    }
  } catch (error) {
    alert(error.message);
  }
}

function setWeather(data) {
  temperature.textContent = `${Math.trunc(data.main.temp)}°`;
  const icon = data.weather[0].icon;
  const iconSrc = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  weatherIcon.src = iconSrc;
  outCityName.textContent = data.name;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  getWeather();
});
