function saveLocationToLocalStorage(key, value) {
	localStorage.setItem(key, JSON.stringify(value));
}

function loadLocations(key) {
	const location = JSON.parse(localStorage.getItem(key));
	return location;
}

export { loadLocations, saveLocationToLocalStorage };
