export function timeConverter(time, timezone) {
	const newDate = new Date((time + timezone) * 1000);
	const localDate = newDate.toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit",
		timeZone: "UTC",
	});
	return localDate;
}

//* функция конвертации unix времени в обычное

export function dateConverter(date, timezone) {
	const newDate = new Date((date + timezone) * 1000);
	const humanDate = newDate.toLocaleString("en-GB", {
		day: "numeric",
		month: "long",
		timeZone: "UTC"
	});
	return humanDate;
}

//* функция конвертации unix даты в нормальную

export function findLocationIndex(locations, newLocation) {
	return locations.findIndex((el) => el.location === newLocation.textContent);
}

//* функция нахождения локации из массива

export function errorHandler(error) {
	alert(error.message);
	console.error(error);
}

//* функция для обработчика ошибок