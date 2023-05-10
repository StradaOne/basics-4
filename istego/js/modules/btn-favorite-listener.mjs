import { getWeatherFavorite } from './get-data-weather.mjs';

function btnFavoriteListener(uiElement) {
  const favoriteLink = uiElement.querySelector('a');
  const nameFavorite = uiElement.querySelector('a').textContent;
  favoriteLink.addEventListener('click', () => {
    getWeatherFavorite(String(nameFavorite));
  })
}

export { btnFavoriteListener };