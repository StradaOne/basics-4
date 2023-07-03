import { tabsContainerNode, tabNodes, tabContentNodes, form, inputCityNode} from './modules/variables.mjs'
import { serverURL, apiKey, cache } from './modules/variables.mjs'
import { NOW_SCREEN_NODES, DETAILS_SCREEN_NODES, FORECAST_SCREEN_NODES, MODAL_NODES, FAV_SCREEN_NODES, } from './modules/variables.mjs'
import { getData, timeConverter, cityExistsInCache, findIndexCityInCache, saveToLocalStorage, findCityIndex } from './modules/functions.mjs'

let currCity = JSON.parse(localStorage.getItem('currCity')) || 'aktobe';
const list = JSON.parse(localStorage.getItem('favCities')) || [];

function modalErrorButtonHandler() {
  MODAL_NODES.modalError.style.display = 'none';
}

MODAL_NODES.modalErrorButton.addEventListener('click', modalErrorButtonHandler);

function showError(error) {
  MODAL_NODES.modalErrorMessage.textContent = error;
  MODAL_NODES.modalError.style.display = 'flex';
}

async function updateCityInCache(name, URL) {
  const data = await getData(URL);
  cache[findIndexCityInCache(cache, name)].data = data;
  cache[findIndexCityInCache(cache, name)].time = new Date().getHours();
  renderWeather(data, name);
  saveToLocalStorage('cache', cache);
}

function loadCityFromCache( name) {
  renderWeather(cache[findIndexCityInCache(cache, name)].data, name);
}


function renderWeather(data, cityName) {
  if (findCityIndex(list, cityName) !== -1) {
    NOW_SCREEN_NODES.NOW_FAV_CITY.src = './assets/svg/shape-full.svg'
  }
  else {
    NOW_SCREEN_NODES.NOW_FAV_CITY.src = './assets/svg/Shape.svg'
  }

  const weather = data.weather[0].main;
  const timeSunrise = timeConverter(data.sys.sunrise, data.timezone);
  const timeSunset = timeConverter(data.sys.sunset, data.timezone);
  const iconID = data.weather[0].icon;
  const srcIcon = `https://openweathermap.org/img/wn/${iconID}@4x.png`;

  NOW_SCREEN_NODES.NOW_TEMP.textContent = data.main.temp;
  NOW_SCREEN_NODES.NOW_ICON_WEATHER.src = srcIcon;
  NOW_SCREEN_NODES.NOW_CITY.textContent = data.name;
  DETAILS_SCREEN_NODES.DETAILS_CITY_NAME.textContent = data.name;
  DETAILS_SCREEN_NODES.DETAILS_TEMP.textContent = data.main.temp
  DETAILS_SCREEN_NODES.DETAILS_TEMP_FEELSLIKE.textContent = data.main.feels_like;
  DETAILS_SCREEN_NODES.DETAILS_WEATHER.textContent = weather;
  DETAILS_SCREEN_NODES.DETAILS_SUNRISE.textContent = timeSunrise;
  DETAILS_SCREEN_NODES.DETAILS_SUNSET.textContent = timeSunset;
  FORECAST_SCREEN_NODES.FORECAST_CITY_NAME.textContent = data.name;
}

tabsContainerNode.addEventListener('click', event => tabsContainerNodeHandler(event));

function tabsContainerNodeHandler(event) {
  if (!event.target.classList.contains('tabs__item')) return;
  const index = Array.from(tabNodes).indexOf(event.target);

  tabNodes.forEach(tab => tab.classList.remove('active'));
  tabContentNodes.forEach(content => content.classList.remove('active'));
  tabNodes[index].classList.add('active');
  tabContentNodes[index].classList.add('active');
}

async function weather(cityName) {
  const URL = `${serverURL}?q=${cityName}&appid=${apiKey}&units=metric`;
  form.reset();
  const isCityInCache = cityExistsInCache(cache, cityName.toLowerCase());
  if (isCityInCache[0] && isCityInCache[1]) {
    loadCityFromCache( cityName);
    currCity = cityName;
    saveToLocalStorage('currCity', currCity)
    return;
  }
  else if (isCityInCache[0] && !isCityInCache[1]) {
    updateCityInCache( cityName, URL);
    currCity = cityName;
    saveToLocalStorage('currCity', currCity);
    return;
  }
  try {
    const data = await getData(URL);
    if ('message' in data) {
      throw new Error(`Error: ${data.message}`); a
    }
    cache.push({
      city: cityName.toLowerCase(),
      data: data,
      time: new Date().getHours(),
    })
    renderWeather(data, cityName);
    saveToLocalStorage('cache', cache);
    currCity = cityName;
    saveToLocalStorage('currCity', currCity)
  } catch (error) {
    showError(error.message);
  }
}

function formHandler(event) {
  event.preventDefault();
  const cityName = inputCityNode.value.trim();
  if (!cityName) {
    showError('Input is blank');
    form.reset();
    return;
  }
  weather(cityName);
}

form.addEventListener('submit', event => formHandler(event));

function addCity(name) {
  if (findCityIndex(list, name) !== -1) {
    console.log('Город уже есть в списке');
    return;
  }
  list.push({ name: name.toLowerCase() });
  saveToLocalStorage('favCities', list);
}

function removeCity(name) {
  const index = findCityIndex(list, name);
  list.splice(index, 1);
  saveToLocalStorage('favCities', list);
  return;
}

function renderFavCities() {
  FAV_SCREEN_NODES.citiesContainer.innerHTML = '';
  for (const city of list) {
    const cityNode = document.createElement('li');
    cityNode.classList.add('city-names_city');
    cityNode.textContent = city.name.charAt(0).toUpperCase() + city.name.slice(1);;
    const closeBtn = document.createElement('span');
    closeBtn.textContent = 'x';
    closeBtn.classList.add('city-names_city-close')
    closeBtn.addEventListener('click', function closeBtnHandler() {
      removeCity(city.name);
      renderFavCities();
      this.removeEventListener('click', closeBtnHandler)
    })
    cityNode.addEventListener('click', function cityNodeHandler(e) {
      if (e.target.classList.contains('city-names_city-close')) { return; }
      weather(city.name.toLowerCase());
    })
    cityNode.appendChild(closeBtn);
    FAV_SCREEN_NODES.citiesContainer.appendChild(cityNode);
  }
}

function favBtnHandler() {
  addCity(NOW_SCREEN_NODES.NOW_CITY.textContent);
  renderFavCities();
  weather(NOW_SCREEN_NODES.NOW_CITY.textContent.toLowerCase());
}

NOW_SCREEN_NODES.NOW_FAV_CITY.addEventListener('click', favBtnHandler)

weather(currCity)
renderFavCities()