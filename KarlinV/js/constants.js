import { storage } from "./saveLocalStorage.js";

export const form = document.querySelector(".form");
export const cityNameInputValue = document.querySelector(".form__input");
export const weatherCards = document.querySelector(".weather__cards");
export const weatherLocationList = document.querySelector(".weather__location-list");

export const startCity = storage.getCurrentCity("currentCity") || "Moscow";
// console.log(storage.getCurrentCity("currentCity"));
export const arrCityList = storage.getFavoriteCities("favoriteCities") || [];
