import {
  tabs,
  windows,
  form,
  input,
  serverUrl,
  apiKey,
  favoriteBtn,
} from "./modules/constants.mjs";
import { renderInfo, addCity, renderStorage } from "./modules/functions.mjs";
import { loadFromLocalStorage, saveLocationToLocalStorage } from "./modules/localstorage.mjs";
// import { setlastItem } from './modules/localstorage.mjs'

export let listOfCities = []

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    for (const tab of tabs) tab.classList.remove("active");
    for (const window of windows) window.classList.remove("active");
    tabs[index].classList.add("active");
    windows[index].classList.add("active");
  });
});

async function getData(apiKey,serverUrl,name) {
  try {
    const cityName = name;
    const response = await fetch(`${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`);
    const data = await response.json();
    if (!response.ok) throw new Error("Такого города не существует");
    saveLocationToLocalStorage('lastLocation', cityName)
    renderInfo(data,cityName)
  } catch (e) {
    if(e.message === 'Failed to fetch') {
      alert('Неправильный адрес URL')
    } else {
      alert(e.message);
    }
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  getData(apiKey,serverUrl,input.value);
});

favoriteBtn.addEventListener('click', () => {
  addCity()
  // renderStorage()
})

document.addEventListener('click', (event) => {
  if (event.target.classList.contains('item')) {
    input.value = event.target.textContent
    getData(apiKey,serverUrl,input.value)
  }
})

window.addEventListener('DOMContentLoaded', () => {
  listOfCities = loadFromLocalStorage('location') || []
  let lastLocation = loadFromLocalStorage('lastLocation')
  renderStorage()
  getData(apiKey, serverUrl, lastLocation)
}
  )

// renderStorage(listOfCities)

