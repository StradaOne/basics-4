import { btnDeleteListener } from './btn-del-listener.mjs';
import { btnFavoriteListener } from './btn-favorite-listener.mjs'

// Создание UI элемента избранного
function createUiElement(nameCity, dataFavorite) {
  const uiElement = document.createElement('li');
  uiElement.classList.add('content-right__list-item');
  uiElement.insertAdjacentHTML('afterbegin',
    `
  <a href="#">${String(nameCity)}</a>
  <button type="button" class="btn-delete"></button>
  `);

  btnDeleteListener(uiElement, dataFavorite);
  btnFavoriteListener(uiElement);
  return uiElement;
}

export { createUiElement };