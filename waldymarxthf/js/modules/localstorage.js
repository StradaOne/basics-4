export function saveLocationToLocalStorage(locations) {
	localStorage.setItem('newLocation', JSON.stringify(locations))
}

export function loadLocations(locations) {
	const oldLocations = JSON.parse(localStorage.getItem('newLocation'))
	locations.push(...oldLocations)
}

export function saveLastLocationToLocalStorage(location) {
	localStorage.setItem('lastLocation', JSON.stringify(location))
}

export function loadLastLocation() {
	const lastLocation = localStorage.getItem('lastLocation') 
	return lastLocation ? JSON.parse(lastLocation) : null
}

export function saveActiveTab(index) {
	localStorage.setItem('activeTab', index.toString());
}

export function loadActiveTab() {
	const activeTabIndex = localStorage.getItem('activeTab')
	return activeTabIndex ? JSON.parse(activeTabIndex) : null
}