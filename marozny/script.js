const tabs = document.querySelectorAll('.tabs__item')
const weatherBlock = document.querySelectorAll('.weather__block')
const searchForm = document.querySelector('.weather__search-form')
const inputCity = document.querySelector('.weather__search-form-input')
const temp = document.querySelector('.weather__block-temp')
const currentCity = document.querySelector('.weather__block-content-city')
const currentIcon = document.querySelector('.weather__block-cloud')

tabs.forEach((tab, index) => {
	tab.addEventListener('click', () => {
		tabs.forEach(t => t.classList.remove('active'))
		weatherBlock.forEach(w => w.classList.remove('active'))

		tab.classList.add('active')
		weatherBlock[index].classList.add('active')
	})
})

async function showWeather(cityName) {
	const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
	const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
	const url = `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`;
	let response = await fetch(url);
	let json = await response.json();
	const temperature = Math.round(json.main.temp);
	temp.textContent = temperature + '°';
	currentCity.textContent = json.name;
	const icon = json.weather[0].icon
	const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`;
	currentIcon.setAttribute('src', iconUrl);
}

searchForm.addEventListener('submit', (event) => {
	event.preventDefault();
	const cityName = inputCity.value;
	showWeather(cityName);
});