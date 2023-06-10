import Cookies from "js-cookie";

export function saveLocation(locations) {
	localStorage.setItem("newLocation", JSON.stringify([...locations]));
}

export function loadLocations(locations) {
	const addedLocations = JSON.parse(localStorage.getItem("newLocation"));
	// console.log(addedLocations);
	if (addedLocations) {
		for (const location of addedLocations) {
			locations.add(location);
		}
	}
}

export function saveLastLocation(location) {
	// localStorage.setItem("lastLocation", JSON.stringify(location));

	const oneHour = new Date(Date.now() + 60 * 60 * 1000);
	Cookies.set("lastLocation", location, { expires: oneHour });
}

export function loadLastLocation() {
	// const lastLocation = localStorage.getItem("lastLocation");

	const lastLocation = Cookies.get("lastLocation");
	return lastLocation ? lastLocation : "Moscow";
}
