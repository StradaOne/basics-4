import { form, cityNameInputValue, arrCityList, tabs } from "./config.js";
import { getDataWeather } from "./weatherForecastFetcher.js";
import { renderCityList } from "./createLocationPoints.js";
import { render } from "./mainRender.js";
import { startCity, weatherLocationList } from "./config.js";
import { storage } from "./saveLocalStorage.js";
import { cookies } from "./saveCookie.js";

//удаление из списка избранного
weatherLocationList.addEventListener("click", async (event) => {
  const itemCity = event.target.parentNode;
  const nameCity = itemCity.textContent;
  const indexCity = arrCityList.indexOf(nameCity);

  if (event.target.classList.value === "weather__location-list") return;

  if (event.target.classList.value !== "weather__location-item-delete") {
    cityNameInputValue.setAttribute("placeholder", event.target.textContent);

    cookies.setCurrentCity(event.target.textContent);
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

  try {
    const data = await getDataWeather(cityNameInputValue.value);
    if (!data) return;

    cookies.setCurrentCity(cityNameInputValue.value);

    cityNameInputValue.setAttribute("placeholder", cityNameInputValue.value);

    render(data);
  } catch (error) {
    console.error(error);
  } finally {
    cityNameInputValue.value = "";
  }
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
(async function () {
  render(await getDataWeather(startCity));
  cityNameInputValue.setAttribute("placeholder", startCity);
  renderCityList();
  cityNameInputValue.focus();
})();
