import { favorites } from "../main.js";

function roundNumber(num) {
   return parseInt(num);
}

function findCity(cityName) {
   return favorites.find(item => item === cityName);
}

export { roundNumber, findCity };