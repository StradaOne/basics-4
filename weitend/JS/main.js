import { tabsBtnsHandler, renderData, getData, addToFavourite, deleteFromFavourite, renderFavourites, renderDataFromFavourites } from "./script.js";
import { form, input } from "./ui.js";

export const favourites = [];
loadLocations();

function loadLocations() {
  if (localStorage.getItem('location')) {
    const town = JSON.parse(localStorage.getItem('location'));
    console.log(town, 'town');
    favourites.push(...town);
    renderFavourites(town); 
  }
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
  input.value = '';
  input.focus();
});