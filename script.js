import { tabs, weatherBlock, UI_ELEMNTS } from './ui_elements.js';
import { timeConverter } from './utils.js';
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'))
    weatherBlock.forEach(w => w.classList.remove('active'))

    tab.classList.add('active')
    weatherBlock[index].classList.add('active')
  })
})

UI_ELEMNTS.FORM.addEventListener('submit', (e) => {
  e.preventDefault()
  updateWeather(UI_ELEMNTS.INPUT_CITY.value)
  clearInput(UI_ELEMNTS.INPUT_CITY)

})

async function updateWeather(location) {
  let weatherData = await getCityFromAPI(location)
  await show_Details(weatherData)
  await show_NOW(weatherData)

}

async function getCityFromAPI(input) {
  const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
  const cityName = input;
  const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
  const url = `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`;

  const data = await fetch(url);
  const result = await data.json()
  localStorage.setItem("lastCity", cityName)
  return result
}

async function show_NOW(obj) {
  UI_ELEMNTS.WEATHER_BLOCK_TEMP_NOW.textContent = obj.main.temp;
  UI_ELEMNTS.WEATHER_BLOCK_CITY_NOW.textContent = obj.name;
  const iconUrl = `https://openweathermap.org/img/wn/${obj.weather[0].icon}@2x.png`
  UI_ELEMNTS.WEATHER_BLOCK_ICON_NOW.src = iconUrl
}

async function show_Details(obj) {
  UI_ELEMNTS.TEMPERATURE_DETAILS.textContent = obj.main.temp;
  UI_ELEMNTS.FEELS_LIKE_DETAILS.textContent = obj.main.feels_like
  UI_ELEMNTS.SKY_DETAILS.textContent = obj.weather[0].description
  UI_ELEMNTS.SUNRISE_DETAILS.textContent = timeConverter(obj.sys.sunrise)
  UI_ELEMNTS.SUNSET_DETAILS.textContent = timeConverter(obj.sys.sunset)
}

UI_ELEMNTS.WEATHER_BLOCK_HEART.addEventListener('click', () => {
  add_To_Storage(UI_ELEMNTS.WEATHER_BLOCK_CITY_NOW.textContent)
})

let storageArr = new Set(JSON.parse(localStorage.getItem("storage"))||[]);

function add_To_Storage(dataCity) {

  storageArr.add(
    dataCity
  );
  console.log(storageArr + 1)
  localStorage.setItem('storage', JSON.stringify([...storageArr]));
  render()
}
console.log(storageArr)
 
function render() {
  UI_ELEMNTS.RIGHT_BLOCk_LIST.innerHTML = "";
  createRecursive( UI_ELEMNTS.RIGHT_BLOCk_LIST,storageArr)
}

function createRecursive(list,storageArr, index=0){
  let arr = Array.from(storageArr);
  if (index === arr.length) {
    return;
}
else{
  let elem =arr[index]
  const result = getCityFromAPI_To_list(elem)
  list.append(result);
}
createRecursive(list, storageArr, index + 1);
}

function getCityFromAPI_To_list(cityName) {
  let city = document.createElement('div');
  city.className = "city-list__items";
  city.textContent = cityName
  let cityBtn = document.createElement('button')
  cityBtn.classList.add('closeButton')
  cityBtn.textContent = "X"
  city.append(cityBtn)
  cityBtn.addEventListener('click', () => { delCity(cityName) })
  add_City_To_Now(city, cityName)
  return city
}

function add_City_To_Now(city, cityName) {
  city.addEventListener('click', () => {
    updateWeather(cityName)
    console.log(cityName)
  }
  )
}

function delCity(city) {
  const index = storageArr.findIndex(elem => elem.dataCity === city)
  storageArr.splice(index, 1)
  localStorage.setItem('storage', JSON.stringify(storageArr));
  render()
}

function clearInput(input) {
  input.value = ""
}

window.addEventListener('DOMContentLoaded', () => {
  let lastCity = localStorage.getItem("lastCity")
  if (!lastCity) {
    lastCity = "Chernihiv"
    localStorage.setItem("lastCity", lastCity)
  }
  updateWeather(lastCity)
})
render();