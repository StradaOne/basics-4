import { form, cityNameInputValue, arrCityList, tabs } from "./constants.js";
import { getDataWeather } from "./weatherForecastFetcher.js";
import { renderCityList } from "./createLocationPoints.js";
import { render } from "./mainRender.js";
import { startCity, weatherLocationList } from "./constants.js";
import { storage } from "./saveLocalStorage.js";

//удаление из списка избранного
weatherLocationList.addEventListener("click", async (event) => {
  const itemCity = event.target.parentNode;
  const nameCity = itemCity.textContent;
  const indexCity = arrCityList.indexOf(nameCity);

  if (event.target.classList.value === "weather__location-list") return;

  if (event.target.classList.value !== "weather__location-item-delete") {
    cityNameInputValue.setAttribute("placeholder", event.target.textContent);

    storage.setCurrentCity(event.target.textContent);

    render(await getDataWeather(event.target.textContent));

    return;
  }

  arrCityList.splice(indexCity, 1);

  storage.setFavoriteCities(arrCityList);

  render(await getDataWeather(cityNameInputValue.getAttribute("placeholder")));
  renderCityList();
});

//получение значения
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  render(await getDataWeather(cityNameInputValue.value));

  storage.setCurrentCity(cityNameInputValue.value);

  cityNameInputValue.setAttribute("placeholder", cityNameInputValue.value);

  cityNameInputValue.value = "";
});

//вкладки
for (const tab of tabs) {
  tab.addEventListener("click", () => {
    if (tab.classList.contains("active")) return;

    for (const otherTab of tabs) {
      otherTab.classList.remove("active");
    }
    tab.classList.add("active");
  });
}

// start
render(await getDataWeather(startCity));
cityNameInputValue.setAttribute("placeholder", startCity);
renderCityList();
