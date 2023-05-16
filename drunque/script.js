import { ui } from "./modules/ui.js";
import { weatherStorage } from "./modules/storage.js";
import { render } from "./modules/render.js";

weatherStorage.history.loadData();
render(weatherStorage.getData("last-query") || "Aktobe");

ui.form.addEventListener("submit", searchHandler);
function searchHandler(event) {
  event.preventDefault();
  const cityName = ui.formInput.value.trim();
  render(cityName);
  weatherStorage.setData("last-query", cityName);
  ui.form.reset()
}

ui.historyNode.addEventListener("click", historyHandler);
function historyHandler(event) {
  if (event.target.classList.contains("delete-button")) {
    const historyCityNode = event.target.closest(".history-city");
    const historyCityNameNode = historyCityNode.querySelector("p");
    const cityName = historyCityNameNode.textContent;

    weatherStorage.history.removeData(cityName);
    if (ui.now.cityName.textContent === cityName) {
      ui.now.favButton.classList.remove("fav-active");
      ui.now.favButton.textContent = "favorite_border";
    }
  } else if (event.target !== ui.historyNode) {
    const isHistoryCity = event.target.classList.contains("history-city");
    const cityNode = isHistoryCity
      ? event.target.querySelector("p")
      : event.target;

    const cityName = cityNode.textContent;
    render(cityName);
    weatherStorage.setData("last-query", cityName);
  }
}

ui.now.favButton.addEventListener("click", favButtonHandler);
function favButtonHandler() {
  const favButton = ui.now.favButton;
  const cityName = ui.now.cityName.textContent;
  const initState = favButton.textContent === "favorite";

  if (initState) {
    weatherStorage.history.removeData(cityName);
    favButton.textContent = "favorite_border";
  } else {
    weatherStorage.history.addData(cityName);
    favButton.textContent = "favorite";
  }

  ui.now.favButton.classList.toggle("fav-active");
}
