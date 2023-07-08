export function saveLocation(locations) {
  localStorage.setItem("newLocation", JSON.stringify([...locations]));
}

export function loadLocations(locations) {
  const addedLocations = JSON.parse(localStorage.getItem("newLocation"));
  console.log(addedLocations);
  if (addedLocations) {
    for (const location of addedLocations) {
      locations.add(location);
    }
  }
}

export function saveLastLocation(location) {
  localStorage.setItem("lastLocation", JSON.stringify(location));
}

export function loadLastLocation(location) {
  const lastLocation = localStorage.getItem("lastLocation");
  return lastLocation ? JSON.parse(lastLocation) : "Moscow";
}
