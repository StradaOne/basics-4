import { deleteFavorite } from './delete-favorite.mjs';

function btnDeleteListener(favoriteItem, dataFavorite) {
  const btnDel = favoriteItem.querySelector('.btn-delete');
  const favoriteText = favoriteItem.querySelector('a').textContent;
  btnDel.addEventListener('click', () => {
    deleteFavorite(favoriteText, dataFavorite);
  })
};

export { btnDeleteListener };