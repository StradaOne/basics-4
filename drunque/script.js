import { ui } from "./modules/ui.js";
import { getWeatherData } from "./modules/server.js";
import { storage } from "./modules/storage.js";
import { formatTemp, renderTime } from "./modules/format.js";

const weatherStorage = storage(renderHistoryNode);
weatherStorage.loadHistoryData();
renderTabNode(weatherStorage.getData("lastQuery"));

function renderTabNode(cityName) {
  getWeatherData(cityName)
    .then((data) => {
      weatherStorage.setData("lastQuery", data.name)
      const isSaved = weatherStorage.historyIncludes(data.name);
      if (isSaved) {
        ui.now.favButton.textContent = "favorite";
        ui.now.favButton.classList.add("fav-active");
      } else {
        ui.now.favButton.textContent = "favorite_border";
        ui.now.favButton.classList.remove("fav-active");
      }

      ui.now.temp.textContent = formatTemp(data.main.temp);
      ui.now.image.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
      ui.now.cityName.textContent = data.name;

      ui.details.cityName.textContent = data.name;
      ui.details.weatherType.textContent = data.weather[0].main;

      ui.details.temp.textContent = formatTemp(data.main.temp);
      ui.details.feelsLike.textContent = formatTemp(data.main["feels_like"]);

      getWeatherData(cityName, "forecast")
        .then(renderForecastTab)
        .catch((error) => console.error(error));

      const timezone = Math.floor(data.timezone / 3600);
      renderTime(ui.details.sunrise, data.sys.sunrise, timezone);
      renderTime(ui.details.sunset, data.sys.sunset, timezone);
    })
    .catch((error) => console.error(error));
}

function renderForecastTab(data) {
  ui.forecast.list.textContent = "";

  ui.forecast.cityName.textContent = data.city.name;
  const forecastList = data.list.slice(0, 5);
  const timezone = Math.floor(data.city.timezone / 3600);

  for (const data of forecastList) {
    const forecastContainer = ui.forecast.createContainer();
    const forecastUI = ui.forecast.getForecastUI(forecastContainer);

    const words = new Date().toString().split(" ")
    words[0] = words[0].slice(3)
    forecastUI.date.textContent = words.slice(1, 3).join(" ");
    renderTime(forecastUI.time, data.dt, timezone);
    
    forecastUI.desc.textContent = data.weather[0].main
    forecastUI.temp.textContent = formatTemp(data.main.temp)
    forecastUI.feelsLike.textContent = formatTemp(data.main["feels_like"])
    forecastUI.image.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`
    
    ui.forecast.list.append(forecastContainer);
  }
}

function renderHistoryNode(data) {
  ui.historyNode.textContent = "";

  for (const cityName of data) {
    const historyCityNode = document.createElement("div");
    historyCityNode.classList.add("history-city");

    const cityNode = document.createElement("p");
    cityNode.textContent = cityName;

    const button = document.createElement("button");
    button.classList.add("material-icons");
    button.classList.add("delete-button");
    button.textContent = "clear";

    historyCityNode.append(cityNode, button);
    ui.historyNode.append(historyCityNode);
  }
}

ui.form.addEventListener("submit", searchHandler);
function searchHandler(event) {
  event.preventDefault();
  const cityName = ui.formInput.value.trim();
  renderTabNode(cityName);
  ui.formInput.value = ""
}

ui.historyNode.addEventListener("click", historyHandler);
function historyHandler(event) {
  if (event.target.classList.contains("delete-button")) {
    const historyCityNode = event.target.closest(".history-city");
    const historyCityNameNode = historyCityNode.querySelector("p");
    const cityName = historyCityNameNode.textContent;

    weatherStorage.removeHistoryData(cityName);
    if (ui.now.cityName.textContent === cityName) {
      ui.now.favButton.classList.remove("fav-active")
      ui.now.favButton.textContent = "favorite_border"
    }
  } else {
    const isHistoryCity = event.target.classList.contains("history-city");
    const cityNode = isHistoryCity
      ? event.target.querySelector("p")
      : event.target;
    renderTabNode(cityNode.textContent);
  }
}

ui.now.favButton.addEventListener("click", favButtonHandler);
function favButtonHandler() {
  const favButton = ui.now.favButton;
  const cityName = ui.now.cityName.textContent;
  const initState = favButton.textContent === "favorite";

  if (initState) {
    weatherStorage.removeHistoryData(cityName);
    favButton.textContent = "favorite_border";
  } else {
    weatherStorage.addHistoryData(cityName);
    favButton.textContent = "favorite";
  }

  ui.now.favButton.classList.toggle("fav-active");
}
