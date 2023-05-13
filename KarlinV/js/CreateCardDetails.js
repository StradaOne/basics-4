import { createEl, convertKelvinToCelsius, convertUnixTimeToTime } from "./config.js";

export const createCardDetails = (data) => {
  const contentItemInfo = [
    `Temperature: ${convertKelvinToCelsius(data.list[0].main.temp)}°`,
    `Feels like: ${convertKelvinToCelsius(data.list[0].main.feels_like)}°`,
    `Weather: ${data.list[0].weather[0].main}`,
    `Sunrise: ${convertUnixTimeToTime(data.city.sunrise, +data.city.timezone)}`,
    `Sunset: ${convertUnixTimeToTime(data.city.sunset, +data.city.timezone)}`,
  ];

  const cardDetails = createEl("div");
  const sityName = createEl("div");
  const listIhfo = createEl("ul");

  cardDetails.classList.add("card", "card__details");
  cardDetails.setAttribute("id", "card-details");
  sityName.classList.add("card__details-sity-name");
  listIhfo.classList.add("card__details-list");

  sityName.textContent = data.city.name;

  for (const content of contentItemInfo) {
    const itemInfo = createEl("li");

    itemInfo.classList.add("card__details-item");

    itemInfo.textContent = content;

    listIhfo.append(itemInfo);
  }

  cardDetails.append(sityName);
  cardDetails.append(listIhfo);

  return cardDetails;
};
