const form = document.querySelector(".search");
const cityName = document.querySelector(".search-input");

const outCityName = document.querySelector(".city");
const temperature = document.querySelector(".temperature");
const weatherIcon = document.querySelector(".weather-icon");;


async function getCity() {
  try {
    const city = cityName.value;
    const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
    const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
    const url = `${serverUrl}?q=${city}&appid=${apiKey}&units=metric`;

    let response = await fetch(url);
    let data = await response.json();

    temperature.textContent = `${Math.trunc(data.main.temp)}°`;
    const icon = data.weather[0].icon;
    const iconSrc = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    weatherIcon.src = iconSrc;
    outCityName.textContent = data.name;
  }
  catch(err) {
    console.log('Ошибка')
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  getCity();
});