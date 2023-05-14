import {
  loadLocations,
  saveLocationToLocalStorage,
  saveLastLocationToLocalStorage,
  loadLastLocation,
} from "./localstorage.js";
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

const storage = [] || loadLocations(storage);

async function getData(cityName) {
  try {
    const serverUrl = "http://api.openweathermap.org/data/2.5/weather";
    const apiKey = "afc9f2df39f9e9e49eeb1afac7034d35";
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

function loadData(temperature, name, icon) {
  UI_ELEMENTS.TEMP.textContent = temperature + "°";
  UI_ELEMENTS.CURRENT_CITY.textContent = name;
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`;
  UI_ELEMENTS.CURRENT_ICON.setAttribute("src", iconUrl);
}

function addToFavorite(name) {
  storage.push({
    location: name,
  });
  saveLocationToLocalStorage(storage);
  saveLastLocationToLocalStorage(name);
  renderLocations();
}

function renderLocations() {
  UI_ELEMENTS.LIST_FAV_CITIES.innerHTML = "";
  storage.forEach((element) => {
    const newFavCity = createLocationElement(element);
    UI_ELEMENTS.LIST_FAV_CITIES.append(newFavCity);
  });
}

function createLocationElement(element) {
  const newFavCity = document.createElement("li");
  newFavCity.classList.add("list-locations__item");
  newFavCity.textContent = element.location;

  const deleteFavCity = document.createElement("button");
  deleteFavCity.classList.add("list-locations__item-btn");
  newFavCity.append(deleteFavCity);

  newFavCity.addEventListener("click", () => {
    getData(element.location);
  });
  deleteFavCity.addEventListener("click", () => {
    deleteLocation(newFavCity);
  });
  return newFavCity;
}

function deleteLocation(name) {
  const index = findLocationIndex(storage, name);
  storage.splice(index, 1);
  saveLocationToLocalStorage(storage);
  renderLocations();
}

function findLocationIndex(storage, name) {
  return storage.findIndex((el) => el.location === name.textContent);
}

addEventListener("DOMContentLoaded", async () => {
  let savedLocation = loadLastLocation();

  if (!savedLocation) {
    savedLocation = "Poznań";
    saveLastLocationToLocalStorage(savedLocation);
  }

  await getData(savedLocation);
});

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

loadLocations(storage);
renderLocations();
