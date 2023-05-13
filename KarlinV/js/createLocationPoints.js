import { createEl } from "./config.js";
import { weatherLocationList, arrCityList } from "./constants.js";

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
