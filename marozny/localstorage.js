function saveLocationToLocalStorage(storage) {
  localStorage.setItem("newFavCity", JSON.stringify(storage));
}

function loadLocations(storage) {
  const oldLocations = JSON.parse(localStorage.getItem("newFavCity"));
  storage.push(...oldLocations);
}

function saveLastLocationToLocalStorage(location) {
  localStorage.setItem("lastLocation", JSON.stringify(location));
}

function loadLastLocation() {
  const lastLocation = localStorage.getItem("lastLocation");
  return lastLocation ? JSON.parse(lastLocation) : null;
}

export { saveLocationToLocalStorage, loadLocations, saveLastLocationToLocalStorage, loadLastLocation };
