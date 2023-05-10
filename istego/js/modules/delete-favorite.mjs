import { renderFavorites } from "./render.mjs";

function deleteFavorite(cityName, dataFavorite) {
  for(let i = 0; i < dataFavorite.length; i++) {
    if(dataFavorite[i] === cityName) {
      dataFavorite.splice(i, 1);
      renderFavorites(dataFavorite);
    }
  }
}

export { deleteFavorite }; 