import { timeConverter, tempConverter } from "./script.js";
import { form, input, weatherElems, tabs, tabsBlocks } from "./ui.js";
import {
  saveToLocalStorage,
  renderFavourites, 
  favourites, 
  activeLocation, 
  saveActiveCityToLocalstorage, 
} from "./localStorage.js";

function loadLocations() {
  if (localStorage.getItem('locations')) {
    const city = JSON.parse(localStorage.getItem('locations'));

    favourites.push(...city);
    renderFavourites(city);
    renderActiveLocation(JSON.parse(localStorage.getItem('activeLocation')));
  };
};

function tabsBtnsHandler(e) {
  if (e.target.classList.contains('tab')) {
    const tabIdx = Array.from(tabs).indexOf(e.target);
    const tabsSort = Array.from(tabs).filter(tab => tab !== tabs[tabIdx]);

    Array.from(tabsSort).forEach(tab => tab.classList.remove('on-tab'));
    tabs[tabIdx].classList.add('on-tab');

    tabsBlocks.forEach(item => item.classList.add('hide'));
    tabsBlocks[tabIdx].classList.remove('hide');
  };
};

async function renderActiveLocation(location) {
  const data = await getData(location[0]);
  renderData(data);
};

async function renderDataFromFavourites(e) {
  if (e.target.classList.contains('locationsName')) {
    const data = await getData(e.target.textContent);
    renderData(data);
    changeActiveLocation(e.target.textContent);
    saveActiveCityToLocalstorage();
  }
};

function changeActiveLocation(name) {
  activeLocation.push(name);
  activeLocation.splice(1, 1);
};

function addToFavourite(e) {
  if (e.target.classList.contains('nowLike')) {

    const name = weatherElems.now.name.textContent;

    const node = `
        <div class="weather__locations-list-box" id="locationsContainer">
            <p class="weather__locations-list-text" id="locationsName">${name}</p>
            <span class="weather__locations-list-del nowDel" id="locationsDelete">╳</span>
        </div>
            `;

    if (favourites.some((el) => el.name === name)) throw new Error('Такой город уже добавлен');

    weatherElems.locations.list.insertAdjacentHTML('afterbegin', node);
    favourites.push({ name: name });
    changeActiveLocation(name);
    saveActiveCityToLocalstorage();
    saveToLocalStorage();
  };
};

function deleteFromFavourite(e) {
  if (e.target.classList.contains('nowDel')) {
    const parentNode = e.target.closest('#locationsContainer');
    parentNode.remove();

    const name = parentNode.querySelector('#locationsName').textContent;
    const nameIdx = favourites.findIndex(c => c.name === name);

    favourites.splice(nameIdx, 1)
    saveToLocalStorage();
    return
  }
};

async function getData(name) {
  const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
  const cityName = name;
  const apiKey = 'afc9f2df39f9e9e49eeb1afac7034d35';
  const url = `${serverUrl}?q=${cityName}&appid=${apiKey}`;
  try {
    const data = await fetch(url)
      .then(res => res.json())
    if ((data.message)) {
      throw new Error('Название города введено неправильно');
    } else {
      return data;
    };
  } catch (err) {
    alert(err)
  }
};

async function renderData(data) {
  const weatherName = data.weather[0].main;
  const temp = tempConverter(data.main.temp);
  const name = data.name;
  const feelsLike = tempConverter(data.main.feels_like);
  const sunrise = timeConverter(data.sys.sunrise);
  const sunset = timeConverter(data.sys.sunset);
  const idIcon = data.weather[0].icon;
  const iconSrc = `https://openweathermap.org/img/wn/${idIcon}@2x.png`;

  weatherElems.now.temp.textContent = temp;
  weatherElems.now.name.textContent = name;
  weatherElems.now.icon.src = iconSrc;

  weatherElems.details.name.textContent = name;
  weatherElems.details.temp.textContent = temp;
  weatherElems.details.feelsLike.textContent = feelsLike;
  weatherElems.details.weatherName.textContent = weatherName;
  weatherElems.details.sunrise.textContent = sunrise;
  weatherElems.details.sunset.textContent = sunset;
};

window.addEventListener('click', async (e) => {
  tabsBtnsHandler(e);
  addToFavourite(e);
  deleteFromFavourite(e);
  renderDataFromFavourites(e);
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = await getData(input.value);
  renderData(data);
  changeActiveLocation(weatherElems.now.name.textContent);
  saveActiveCityToLocalstorage();
  input.value = '';
  input.focus();
});

loadLocations();