import {
  UI,
  serverUrl,
  apiKey,
  storage,
  createStorage,
  parseToObjLocalCity,
  parseToArrlocalFavorites,
  parseToStrLocalCity,
  parseToStrlocalFavorites
} from './modules/index.mjs';

createStorage();
render();
renderFavorites();

// Обработчик кнопок навигации now, details, forecast
UI.navBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    for (let i = 0; i < UI.navBtns.length; i++) {
      UI.navBtns[i].classList.remove('active-btn');
    }
    btn.classList.add('active-btn');
  })
});

// Слушатель формы - поиск городов
UI.formFind.addEventListener('submit', getWeather);

// Обработчик кнопки добавления избранного
UI.nowBtnFavorites.addEventListener('click', addFavorite)

// Добавление избранного
function addFavorite() {
  const favorites = new Set();

  // Получили фавориты из локал
  const ListFavoriteString = parseToArrlocalFavorites();

  // Получили данные о погоде из локал
  const ListDataString = parseToObjLocalCity();

  for (const city of ListFavoriteString) {
    favorites.add(city);
  }

  if (ListFavoriteString) {
    if (favorites.has(ListDataString.weatherCityName)) {
      deleteFavorite(ListDataString.weatherCityName);
      return;
    } else {
      favorites.add(ListDataString.weatherCityName);
    }
    if (ListDataString.weatherCityName === undefined) {
      alert('Сначала найдите интересующий город');
      return;
    }

    // Положили в локал
    parseToStrlocalFavorites([...favorites]);
    renderFavorites();
  }
}

// Получение данных с сервера при поиске городов
async function getWeather(event) {
  event.preventDefault();
  const cityName = UI.findInp.value;
  const url = `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`;

  try {
    UI.preload.style.display = 'flex';
    const response = await fetch(url);
    const weatherData = await response.json();

    if (weatherData.cod === 200) {
      UI.findInp.value = '';
      render(dataGeneration(weatherData));
    }
    else if (weatherData.cod === '400' || weatherData.cod === '404') {
      UI.findInp.value = '';
      alert('Город не найден');
    }
  } catch (error) {
    alert('Произошла ошибка');
    console.log('Error: ' + error.message);
  } finally {
    UI.preload.style.display = 'none';
  }
}

// формирование данных при поиске городов
function dataGeneration(weatherData) {
  // Извлечение времени из объекта JSON
  const sunriseTime = new Date(weatherData.sys.sunrise * 1000);
  const sunsetTime = new Date(weatherData.sys.sunset * 1000);

  // Нужные данные для UI погоды
  const listData = {
    weatherCityName: weatherData.name,
    weatherIcon: weatherData.weather[0].icon,
    weatherTemp: weatherData.main.temp,
    weatherFeelsLike: weatherData.main.feels_like,
    weatherClouds: weatherData.weather[0].main,
    weatherSunrise: sunriseTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    weatherSunset: sunsetTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  // Положили в локал
  parseToStrLocalCity(listData);
}


// Рендер левого контента
function render() {
  // получить строку из localStorage
  const ListDataString = parseToObjLocalCity();

  if (Object.keys(ListDataString).length != 0) {
    UI.nowDegree.textContent = Math.round(ListDataString.weatherTemp);
    UI.nowIcon.src = `https://openweathermap.org/img/wn/${ListDataString.weatherIcon}@2x.png`;
    UI.nowCityName.textContent = ListDataString.weatherCityName;
    UI.detailsCity.textContent = ListDataString.weatherCityName;
    UI.detailsTemperature.textContent = Math.round(ListDataString.weatherTemp);
    UI.detailsFeelsLike.textContent = Math.round(ListDataString.weatherFeelsLike);
    UI.detailsWeather.textContent = ListDataString.weatherClouds;
    UI.detailsSunrise.textContent = ListDataString.weatherSunrise;
    UI.detailsSunset.textContent = ListDataString.weatherSunset;

    paintFavorite();

    return;
  }
}


// Получение данных с сервера для избранных. 
async function getWeatherFavorite(cityName) {
  const url = `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`;

  try {
    UI.preload.style.display = 'flex';
    const response = await fetch(url);
    const weatherData = await response.json();

    if (weatherData.cod === 200) {
      UI.findInp.value = '';
      render(dataGeneration(weatherData));
      UI.preload.style.display = 'none';
    }
    else if (weatherData.cod === '404') {
      UI.findInp.value = '';
      alert('Город не найден');
      UI.preload.style.display = 'none';
    }
  } catch (error) {
    alert('Произошла ошибка');
    console.log('Error: ' + error.message);
    UI.preload.style.display = 'none';
  }
}

// Создание UI элемента избранного
function createUiElement(nameCity) {
  const uiElement = document.createElement('li');
  uiElement.classList.add('content-right__list-item');
  uiElement.insertAdjacentHTML('afterbegin',
    `
  <a href="#">${String(nameCity)}</a>
  <button type="button" class="btn-delete"></button>
  `);

  btnDeleteListener(uiElement);
  btnFavoriteListener(uiElement);
  return uiElement;
}

// Слушатель кнопки удаления в избранных
function btnDeleteListener(favoriteItem) {
  const btnDel = favoriteItem.querySelector('.btn-delete');
  const favoriteText = favoriteItem.querySelector('a').textContent;
  btnDel.addEventListener('click', () => {
    deleteFavorite(favoriteText);
  })
};

// Слушатель избранных, если клик делаем запрос данных
function btnFavoriteListener(uiElement) {
  const favoriteLink = uiElement.querySelector('a');
  const nameFavorite = uiElement.querySelector('a').textContent;
  favoriteLink.addEventListener('click', () => {
    getWeatherFavorite(String(nameFavorite));
  })
}

// Рендер правого контента - избранных
function renderFavorites() {
  const uiFavorite = document.querySelectorAll('.content-right__list-item');
  uiFavorite.forEach(item => {
    item.remove();
  });
  // Получили фавориты из локал
  const ListFavoriteString = parseToArrlocalFavorites();

  ListFavoriteString.forEach(city => {
    UI.contentRight.prepend(createUiElement(city, ListFavoriteString));
  });
  paintFavorite();
}

// удаление избранных
function deleteFavorite(city) {
  const favorites = new Set();
  // Получили фавориты из локал
  const ListFavoriteString = parseToArrlocalFavorites();

  for (const city of ListFavoriteString) {
    favorites.add(city);
  }

  favorites.delete(city);

  // Положили в локал
  parseToStrlocalFavorites([...favorites]);
  renderFavorites();
}

// Смена сердечка избранных
function paintFavorite() {
  // Получили фавориты из локал
  const ListFavoriteString = parseToArrlocalFavorites();
  // Получили данные о погоде из локал
  const ListDataString = parseToObjLocalCity();

  if (ListFavoriteString.includes(ListDataString.weatherCityName)) {
    UI.nowBtnFavorites.style.backgroundImage = 'url(./source/isons/ShapeAdd.svg)';
  } else {
    UI.nowBtnFavorites.style.backgroundImage = 'url(./source/isons/Shape.svg)';
  }
}

function checkFavorite() {
  const savedListDataString = localStorage.getItem('myListData');
  const savedListData = JSON.parse(savedListDataString);
  // получить строку из localStorage
  const listDataStrFavorites = localStorage.getItem('myListDataFavorites');
  // преобразовать строку обратно в объект
  const savedListDataFavofites = JSON.parse(listDataStrFavorites);
  for (let i = 0; i < savedListDataFavofites.length; i++) {
    if (savedListDataFavofites[i] === savedListData.weatherCityName) {
      return true;
    }
  }
}