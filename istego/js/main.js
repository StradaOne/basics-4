import { UI, getWeather, render, renderFavorites } from './modules/index.mjs';
// Хранилище для избранных
const favorites = [
];

// Обработчик 
UI.navBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    for (let i = 0; i < UI.navBtns.length; i++) {
      UI.navBtns[i].classList.remove('active-btn');
    }
    btn.classList.add('active-btn');
  })
});

// Слушатель формы
UI.formFind.addEventListener('submit', getWeather);

// Обработчик кнопки добавления избранного
UI.nowBtnFavorites.addEventListener('click', addFavorite)

render();

// Добавление избранного
function addFavorite() {
  if (localStorage.myListData) {
    const savedListDataString = localStorage.getItem('myListData');
    const savedListData = JSON.parse(savedListDataString);

    if (favorites.includes(savedListData.weatherCityName)) {
      alert('Уже добавлен');
      return;
    }

    favorites.push(savedListData.weatherCityName);
    renderFavorites(favorites);
  }
}