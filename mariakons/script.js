import { loadFromLocalStorage, saveToLocalStorage } from "./modules/localstorage.js";
import { createElement, updateWeather } from "./modules/ui.js";
import { VARIABLES } from "./modules/variables.js";



let favoriteCities = loadFromLocalStorage("FavCity") || [];

VARIABLES.MAIN.tabs.forEach((tab, index)=>{
   tab.addEventListener('click', () =>{
     VARIABLES.MAIN.tabs.forEach(t => t.classList.remove('active'))
     VARIABLES.MAIN.weatherBlock.forEach(w => w.classList.remove('active'))

      tab.classList.add('active')
     VARIABLES.MAIN.weatherBlock[index].classList.add('active')
   })
})

export function addFavorites(cityName){
   if(favoriteCities.some(key => key.cityName === cityName)){
      return;
   }
   favoriteCities.push({cityName});
   saveToLocalStorage("FavCity", favoriteCities);
}
export function deleteFavorites(cityName){
    favoriteCities = favoriteCities.filter(city => city.cityName !== cityName);
    saveToLocalStorage("FavCity", favoriteCities);
}
export function renderFavorites(){
   VARIABLES.FAVORITES.containter.innerHTML = '';

   for (let i = 0; i < favoriteCities.length; i++){
      let city = createElement(favoriteCities[i].cityName);
      VARIABLES.FAVORITES.containter.append(city);
   }
}
VARIABLES.MAIN.searchForm.addEventListener('submit', function(ev){
   ev.preventDefault();
   let location = document.querySelector('.weather__search-form-input').value;
   updateWeather(location);
   VARIABLES.MAIN.searchForm.reset();
})

VARIABLES.FAVORITES.like.addEventListener("click", function(){
   addFavorites(VARIABLES.NOW.nowCityName.textContent);
   renderFavorites(favoriteCities);
});
window.addEventListener("DOMContentLoaded", ()=>{
   loadFromLocalStorage("FavCity");
   const city = loadFromLocalStorage("LastLocation");
   updateWeather(city);
   renderFavorites();
})