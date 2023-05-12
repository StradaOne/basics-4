import { createEl, convertKelvinToCelsius, convertUnixTimeToTime, convertUnixTimeToDate } from "./config.js";

export const createCardForecast = (data) => {
  const cardForecast = createEl("div");
  const cityName = createEl("div");
  const forecastList = createEl("ul");

  cardForecast.classList.add("card", "card__forecast");
  cardForecast.setAttribute("id", "card-forecast");
  cityName.classList.add("card__forecast-sity-name");
  forecastList.classList.add("card__forecast-list");

  cityName.textContent = data.city.name;

  for (const dataItem of data.list) {
    const forecastItem = createEl("li");
    const itemDate = createEl("div");
    const itemDay = createEl("div");
    const itemTime = createEl("div");
    const itemInfo = createEl("div");
    const itemInfoLeftContent = createEl("div");
    const itemInfoTemperature = createEl("div");
    const itemInfoFeelsLike = createEl("div");
    const itemInfoRightContent = createEl("div");
    const itemInfoStatusText = createEl("div");
    const itemInfoStatusIcon = createEl("div");

    forecastItem.classList.add("card__forecast-item");
    itemDate.classList.add("card__forecast-item-date");
    itemInfo.classList.add("card__forecast-item-info");
    itemInfoRightContent.classList.add("card__forecast-item-info-right");
    itemInfoStatusIcon.classList.add("card__forecast-item-info-icon");

    itemDay.textContent = convertUnixTimeToDate(dataItem.dt);
    itemTime.textContent = convertUnixTimeToTime(dataItem.dt);
    itemInfoTemperature.textContent = `Temperature: ${convertKelvinToCelsius(dataItem.main.temp)}°`;
    itemInfoFeelsLike.textContent = `Feels like: ${convertKelvinToCelsius(dataItem.main.feels_like)}°`;
    itemInfoStatusText.textContent = dataItem.weather[0].main;

    itemInfoStatusIcon.style.backgroundImage = `url(http://openweathermap.org/img/wn/${dataItem.weather[0].icon}.png)`;
    itemInfoStatusIcon.setAttribute("title", data.list[0].weather[0].description);

    itemDate.append(itemDay);
    itemDate.append(itemTime);

    itemInfoLeftContent.append(itemInfoTemperature);
    itemInfoLeftContent.append(itemInfoFeelsLike);

    itemInfoRightContent.append(itemInfoStatusText);
    itemInfoRightContent.append(itemInfoStatusIcon);

    itemInfo.append(itemInfoLeftContent);
    itemInfo.append(itemInfoRightContent);

    forecastItem.append(itemDate);
    forecastItem.append(itemInfo);

    forecastList.append(forecastItem);
  }

  cardForecast.append(cityName);
  cardForecast.append(forecastList);

  return cardForecast;
};
