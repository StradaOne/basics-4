import { loadFromLocalStorage, saveToLocalStorage } from "./localstorage.js";
import { createLocationElement } from "./ui.js";
import { findLocationIndex, errorHandler } from "./utils.js";
import { VARIABLES } from "./ui-variables.js";

const locations = loadFromLocalStorage("newLocation") || [];

export function renderLocations() {
	VARIABLES.LOCATIONS.LIST.innerHTML = "";
	locations.forEach((element) => {
		const newLocation = createLocationElement(element);
		VARIABLES.LOCATIONS.LIST.append(newLocation);
	});
	changeIcon();
}

//* рендерит локации из массива

export function addLocation() {
	try {
		const cityName = VARIABLES.NOW.CITY.textContent;

		if (locations.some((el) => el.location === cityName)) {
			throw new Error("Такой город или страна уже добавлена");
		}

		locations.push({
			location: cityName,
		});

		saveToLocalStorage("newLocation", locations);
		renderLocations();
	} catch (error) {
		errorHandler(error);
	}
}

//* добавляет локацию в массив

export function deleteLocation(newLocation) {
	const index = findLocationIndex(locations, newLocation);
	locations.splice(index, 1);
	saveToLocalStorage("newLocation", locations);
	renderLocations();
}

//* функция удаления локации

export function changeIcon() {
	const currentLocation = VARIABLES.NOW.CITY.textContent;
	const isLocationInArray = locations.some(
		(el) => el.location === currentLocation
	);

	if (isLocationInArray) {
		VARIABLES.NOW.LIKE.src = "./assets/svg/heart-liked.svg";
	} else {
		VARIABLES.NOW.LIKE.src = "./assets/svg/heart.svg";
	}
}

//* функция, делает сердечко нажатым если город добавили в избранное
