import { input, city, temperature, icon, favoriteList } from "./constants.mjs";
import { saveLocationToLocalStorage, removeItem } from "./localstorage.mjs";
import { listOfCities } from "../script.js";

let countId = 0;

export function renderInfo(data, name) {
  if (data) {
    city.textContent = name.slice(0, 1).toUpperCase() + name.slice(1);
    temperature.textContent = `${Math.round(data.main.temp)}°`;
    icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  }
  input.value = "";
}

export function resetDom() {
  favoriteList.innerHTML = "";
}

export function addCity() {
  // if(listOfCities.includes(city.textContent)) return
  // listOfCities.push(city.textContent)
  listOfCities.push({
    location: city.textContent,
  });
  console.log(listOfCities);
  // setItem(listOfCities)
  saveLocationToLocalStorage("location", listOfCities);
  renderStorage();
}

export function deleteCity(event) {
  const idBtn = event.target.getAttribute("id");
  console.log(event.target)
  listOfCities.splice(idBtn, 1);
  console.log(listOfCities)
  // renderFavorite()
//   const nameBtn = event.target.getAttribute('name')
//   removeItem('location')
  renderStorage();
}

// export function renderFavorite() {
// 	countId = 0

// 	// listOfCities.forEach((el) => createEl(el))

// }
export function renderStorage() {
  countId = 0
  resetDom();
  // const localStorageSize = localStorage.length
  //   for (let i = 0; i < localStorageSize; i++) {
  // 	createEl(getItem(i))
  // }
	listOfCities.forEach((el) => createEl(el.location))
//   listOfCities.forEach((el) => {
//     const result = createEl(el.location);
//     favoriteList.append(result);
//   });
  // favoriteList.append(element)
  // return element)
}

export function createEl(city) {
  const newCity = document.createElement("li");
  const closeBtn = document.createElement("button");
  closeBtn.className = "closeBtn";
  newCity.className = "item";
  closeBtn.id = `${countId++}`;
  closeBtn.name = city;

  newCity.textContent = city;
  favoriteList.appendChild(newCity)
  newCity.appendChild(closeBtn);

  closeBtn.addEventListener("click", deleteCity);
}
