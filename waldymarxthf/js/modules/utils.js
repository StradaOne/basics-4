export function timeConverter(time, timezone) {
	const newDate = new Date((time + timezone) * 1000)
	const localDate = newDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' });
	return localDate
}

//* функция конвертации unix времени в обычное

export function dateConverter(date) {
	const newDate = new Date((date) * 1000)
	const humanDate = newDate.toLocaleString("en-GB", {day: "numeric", month: "long"})
	return humanDate
}

//* функция конвертации unix даты в нормальную

export function findLocationIndex(locations, newLocation) {
	return locations.findIndex(el => el.location === newLocation.textContent)
}

//* функция нахождения локации из массива

export function errorHandler(error) {
	alert(error.message)
	console.error(error.message)
}

//* функция для обработчика ошибок