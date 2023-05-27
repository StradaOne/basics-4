import { formatTemp, formatTime } from "./format.js";
import { getWeatherData } from "./server.js";

function renderNowTab(data, isSaved) {
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
}

function renderDetailsTab(data) {
  ui.details.cityName.textContent = data.name;
  ui.details.weatherType.textContent = data.weather[0].main;

  ui.details.temp.textContent = formatTemp(data.main.temp);
  ui.details.feelsLike.textContent = formatTemp(data.main["feels_like"]);

  const timezone = Math.floor(data.timezone / 3600);

  ui.details.sunset.textContent = formatTime(data.sys.sunset, timezone);
  ui.details.sunrise.textContent = formatTime(data.sys.sunrise, timezone);
}

function renderForecastTab(data) {
  ui.forecast.list.textContent = "";

  ui.forecast.cityName.textContent = data.city.name;
  const forecastDataList = data.list;
  const timezone = Math.floor(data.city.timezone / 3600);

  for (const data of forecastDataList) {
    const container = ui.forecast.createContainer();
    container.ui = ui.forecast.getUI(container);

    const formatDate = (unix) => {
      const date = new Date(unix * 1000).toString().split(" ");
      date[0] = date[0].slice(3);
      return date.slice(1, 3).join(" ");
    };

    container.ui.date.textContent = formatDate(data.dt);
    container.ui.time.textContent = formatTime(data.dt, timezone);

    container.ui.desc.textContent = data.weather[0].main;
    container.ui.temp.textContent = formatTemp(data.main.temp);
    container.ui.feelsLike.textContent = formatTemp(data.main["feels_like"]);
    const src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
    container.ui.image.src = src;

    ui.forecast.list.append(container);
  }
}

export function renderCreate(isSaved) {
  return function (cityName) {
    getWeatherData(cityName)
      .then((data) => {
        renderNowTab(data, isSaved(data.name));
        renderDetailsTab(data);
      })
      .catch(console.error);

    getWeatherData(cityName, "forecast")
      .then(renderForecastTab)
      .catch(console.error);
  };
}

export function renderHistoryNode(data) {
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
