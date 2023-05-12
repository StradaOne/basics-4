import { createEl } from "./config.js";
import { weatherLocationList, arrCityList, cityNameInputValue } from "./constants.js";
import { render } from "./mainRender.js";
import { getDataWeather } from "./weatherForecastFetcher.js";

weatherLocationList.addEventListener("click", async (event) => {
  const itemCity = event.target.parentNode;
  const nameCity = itemCity.textContent;
  const indexCity = arrCityList.indexOf(nameCity);

  if (event.target.classList.value === "weather__location-list") return;

  if (event.target.classList.value !== "weather__location-item-delete") {
    cityNameInputValue.setAttribute("placeholder", event.target.textContent);

    render(await getDataWeather(event.target.textContent));

    return;
  }

  arrCityList.splice(indexCity, 1);

  render(await getDataWeather(cityNameInputValue.getAttribute("placeholder")));
  renderCityList();
});

export const renderCityList = () => {
  weatherLocationList.innerHTML = "";

  for (const cityName of arrCityList) {
    createLocationPoints(cityName);
  }
};

export const createLocationPoints = (name) => {
  const localItem = createEl("li");
  const btnDeleteItem = createEl("span");

  localItem.classList.add("weather__location-item");
  btnDeleteItem.classList.add("weather__location-item-delete");

  localItem.textContent = name;
  localItem.append(btnDeleteItem);

  weatherLocationList.append(localItem);
};
