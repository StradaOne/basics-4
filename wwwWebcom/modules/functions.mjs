import {input,city,temperature,icon, favoriteList, listOfCities} from './constants.mjs'

let countId = 0

export function renderInfo(data,name) {
	if (data) {
		city.textContent = input.value.slice(0,1).toUpperCase() + input.value.slice(1)
		temperature.textContent = `${Math.round(data.main.temp)}°`
		icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
	}
	input.value = ''
}

export function resetDom() {
	favoriteList.innerHTML = "";
  }


export function addCity() {
	if(listOfCities.includes(city.textContent)) return
	listOfCities.push(city.textContent)
	console.log(listOfCities)
}

export function deleteCity(event){
	const idBtn = event.target.getAttribute('id')
	listOfCities.splice(idBtn,1)
	renderFavorite()
}

export function renderFavorite() {
	countId = 0
	resetDom();
	listOfCities.forEach((el) => createEl(el))
}

export function createEl(city) {
	const newCity = document.createElement('li')
	const closeBtn = document.createElement('button')
	closeBtn.className = 'closeBtn'
	newCity.className = 'item'
	closeBtn.id = `${countId++}`

	newCity.textContent = city
	favoriteList.appendChild(newCity)
	newCity.appendChild(closeBtn)

	closeBtn.addEventListener('click', deleteCity)
}









