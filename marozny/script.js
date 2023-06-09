import { loadLocations, saveLocationToLocalStorage } from "./localstorage.js";
import { UI_ELEMENTS } from "./ui-elements.js";
import { addToFavorite, renderLocations, updateBlock } from "./ui.js";

window.addEventListener("DOMContentLoaded", async () => {
  let savedLocation = loadLocations("LastLocation");

  if (!savedLocation) {
    savedLocation = "Poznań";
    saveLocationToLocalStorage("LastLocation", savedLocation);
  }

  await updateBlock(savedLocation);

  let start = Data.now();
});

UI_ELEMENTS.NOW.SEARCH_FORM.addEventListener("submit", (event) => {
  event.preventDefault();
  const cityName = UI_ELEMENTS.NOW.INPUT_CITY.value;
  updateBlock(cityName);
  event.target.reset();
});

UI_ELEMENTS.NOW.FAVORITE_BUTTON.addEventListener("click", () => {
  let name = UI_ELEMENTS.NOW.CURRENT_CITY.textContent;
  addToFavorite(name);
  renderLocations();
});
