//* функция сохранения списка городов в localStorage

export function saveFavoriteCitiesInlocalStorage(cities) {
  const cityList = JSON.stringify(cities);
  localStorage.setItem("favoriteCities", cityList);
}

//* функция получения списка городов из localStorage

export function getFavoriteCitiesFromlocalStorage() {
  const cityList = localStorage.getItem("favoriteCities");
  const result = JSON.parse(cityList);
  return result || [];
}

//* функция сохранения актуального города в localStorage

export function saveCurrentCityInLocalStorage(cityName) {
  localStorage.setItem("currentCity", cityName);
}

//* функция получения актуального города в localStorage

export function getCurrentCityFromlocalStorage() {
  return localStorage.getItem("currentCity") || "Vladivostok";
}