import { getData } from "./script.js";
import { UI_ELEMENTS } from "./ui.js";

function loadData(temperature, name, icon) {
  UI_ELEMENTS.TEMP.textContent = temperature + "°";
  UI_ELEMENTS.CURRENT_CITY.textContent = name;
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`;
  UI_ELEMENTS.CURRENT_ICON.setAttribute("src", iconUrl);
}

function addToFavorite(name) {
  const newFavCity = document.createElement("li");
  const deleteFavCity = document.createElement("button");
  newFavCity.classList.add("list-locations__item");
  deleteFavCity.classList.add("list-locations__item-btn");
  newFavCity.textContent = name;
  UI_ELEMENTS.LIST_FAV_CITIES.append(newFavCity);
  newFavCity.append(deleteFavCity);

  newFavCity.addEventListener("click", () => {
    getData(name);
  });
  deleteFavCity.addEventListener("click", function removeCity() {
    UI_ELEMENTS.LIST_FAV_CITIES.removeChild(newFavCity);
    this.removeEventListener("click", removeCity);
  });
}

export { loadData, addToFavorite };
