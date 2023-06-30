export function saveToLocalStorage(key, value) {
	localStorage.setItem(key, JSON.stringify(value));
}

export function loadFromLocalStorage(key) {
	try {
		return JSON.parse(localStorage.getItem(key));
	} catch (err) {
		console.log(err);
	}
}
