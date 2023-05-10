import { addToFavorite, loadData } from "./render.js";
import { UI_ELEMENTS } from "./ui.js";
import { round } from "./utils.js";

UI_ELEMENTS.TABS.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    UI_ELEMENTS.TABS.forEach((t) => t.classList.remove("active"));
    UI_ELEMENTS.WEATHER_BLOCK.forEach((w) => w.classList.remove("active"));
    tab.classList.add("active");
    UI_ELEMENTS.WEATHER_BLOCK[index].classList.add("active");
  });
});

async function getData(cityName) {
  try {
    const serverUrl = "http://api.openweathermap.org/data/2.5/weather";
    const apiKey = "f660a2fb1e4bad108d6160b7f58c555f";
    const url = `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`;
    let response = await fetch(url);
    if (response.ok) {
      let json = await response.json();
      const temperature = round(json.main.temp);
      const icon = json.weather[0].icon;
      const name = json.name;
      loadData(temperature, name, icon);
    } else {
      throw new Error((await response.json()).message);
    }
  } catch (error) {
    alert(error);
  }
}

UI_ELEMENTS.SEARCH_FORM.addEventListener("submit", (event) => {
  event.preventDefault();
  const cityName = UI_ELEMENTS.INPUT_CITY.value;
  getData(cityName);
  event.target.reset();
});

UI_ELEMENTS.FAVORITE_BUTTON.addEventListener("click", () => {
  let name = UI_ELEMENTS.CURRENT_CITY.textContent;
  addToFavorite(name);
});

export { getData };
