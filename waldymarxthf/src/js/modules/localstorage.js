export function saveToLocalStorage(key, value) {
	localStorage.setItem(key, JSON.stringify(value));
}

export function loadFromLocalStorage(key) {
	const result = localStorage.getItem(key);
	return result ? JSON.parse(result) : null;
}
