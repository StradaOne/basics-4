import {
  tabs,
  windows,
  form,
  input,
  apiKey,
  favoriteBtn,
  city,
  temperature,
  icon,
  favoriteList,
  detailsCity,
  detailsTemperature,
  detailsFeels,
  detailsWeather,
  detailsSunrise,
  detailsSunset,
  forecastCity,
  forecastDate,
  forecastTime,
  forecastTemperature,
  forecastFeels,
  forecastRainfall,
  forecastIcon,
} from "./modules/constants.mjs";
import {
  loadFromLocalStorage,
  saveLocationToLocalStorage,
} from "./modules/localstorage.mjs";

//-------------------------------------------------------------------------------------
let listOfCities = [];

let countId = 0;

//-------------------------------------------------------------------------------------
tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    for (const tab of tabs) tab.classList.remove("active");
    for (const window of windows) window.classList.remove("active");
    tabs[index].classList.add("active");
    windows[index].classList.add("active");
  });
});

//-------------------------------------------------------------------------------------

async function getData(apiKey, name, nameEndPoint) {
  try {
    const cityName = name;
    const serverUrl = "http://api.openweathermap.org/data/2.5";
    const endPoint = nameEndPoint;
    const response = await fetch(
      `${serverUrl}/${endPoint}?q=${cityName}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();

    if (!response.ok) throw new Error("Такого города не существует");

    saveLocationToLocalStorage("lastLocation", cityName);

    if (endPoint === "weather") {
      renderInfoNow(data, cityName);
      renderInfoDetails(data, cityName);
    }
    if (endPoint === "forecast") {
      renderInfoForecast(data, cityName);
    }
  } catch (e) {
    if (e.message === "Failed to fetch") {
      alert("Неправильный адрес URL");
    } else {
      alert(e.message);
    }
  }
}

function renderInfoNow(data, name) {
  if (data) {
    city.textContent = name.slice(0, 1).toUpperCase() + name.slice(1);
    temperature.textContent = `${Math.round(data.main.temp)}°`;
    icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  }
}

function renderInfoDetails(data, name) {
  if (data) {
    detailsCity.textContent = name.slice(0, 1).toUpperCase() + name.slice(1);
    detailsTemperature.textContent = `${Math.round(data.main.temp)}`;
    detailsFeels.textContent = `${Math.round(data.main.feels_like)}`;
    detailsWeather.textContent = data.weather[0].main;
    detailsSunrise.textContent = timeConverter(data.sys.sunrise,data.timezone);
    detailsSunset.textContent = timeConverter(data.sys.sunset,data.timezone);
  }
}

function renderInfoForecast(data, name) {
  if (data) {
    forecastCity.textContent = name.slice(0, 1).toUpperCase() + name.slice(1);

    forecastDate.forEach((el,index) => {
      el.textContent = dateConverter(data.list[index].dt, data.city.timezone)
    })

    forecastTime.forEach((el,index) => {
      el.textContent = timeConverter(data.list[index].dt)
    })

    forecastTemperature.forEach((el,index) => {
      el.textContent = `${Math.round(data.list[index].main.temp)}`
    })

    forecastFeels.forEach((el,index) => {
      el.textContent = `${Math.round(data.list[index].main.feels_like)}`
    })

    forecastRainfall.forEach((el,index) => {
      el.textContent = data.list[index].weather[0].main
    })
    
    forecastIcon.forEach((el,index) => {
      el.src = `https://openweathermap.org/img/wn/${data.list[index].weather[0].icon}@2x.png`
    })
  }
}

//-------------------------------------------------------------------------------------

function addCity() {
  for (let i = 0; i < listOfCities.length; i++) {
    if (listOfCities[i].location === city.textContent) return;
  }
  listOfCities.push({
    location: city.textContent,
  });
  renderStorage();
}

function deleteCity(event) {
  const idBtn = event.target.getAttribute("id");
  listOfCities.splice(idBtn, 1);
  renderStorage();
}

function resetDom() {
  favoriteList.innerHTML = "";
}

function renderStorage() {
  countId = 0;
  resetDom();
  listOfCities.forEach((el) => createEl(el.location));
  saveLocationToLocalStorage("location", listOfCities);
}

//-------------------------------------------------------------------------------------

function createEl(city) {
  const newCity = document.createElement("li");
  const closeBtn = document.createElement("button");
  closeBtn.className = "closeBtn";
  newCity.className = "item";
  closeBtn.id = `${countId++}`;
  closeBtn.name = city;

  newCity.textContent = city;
  favoriteList.appendChild(newCity);
  newCity.appendChild(closeBtn);

  closeBtn.addEventListener("click", deleteCity);
}

//-------------------------------------------------------------------------------------

function timeConverter(time, timezone = 0) {
	const newDate = new Date((time + timezone) * 1000);
	const localTime = newDate.toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit",
		timeZone: "UTC",
	});
	return localTime;
}

function dateConverter(date, timezone) {
	const newDate = new Date((date + timezone) * 1000);
	const localDate = newDate.toLocaleString("en-GB", {
		day: "numeric",
		month: "long",
		timeZone: "UTC"
	});
	return localDate;
}

//---------------------------------------<Events>--------------------------------------

form.addEventListener("submit", (event) => {
  event.preventDefault();
  getData(apiKey, input.value, "weather");
  getData(apiKey, input.value, "forecast");
  input.value = "";
});

favoriteBtn.addEventListener("click", () => {
  addCity();
});

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("item")) {
    input.value = event.target.textContent;
    getData(apiKey, input.value, "weather");
    getData(apiKey, input.value, "forecast");
    input.value = "";
  }
});

window.addEventListener("DOMContentLoaded", () => {
  listOfCities = loadFromLocalStorage("location") || [];
  let lastLocation = loadFromLocalStorage("lastLocation");
  renderStorage();
  getData(apiKey, lastLocation, "weather");
  getData(apiKey, lastLocation, "forecast");
});
