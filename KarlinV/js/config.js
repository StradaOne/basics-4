import { storage } from "./saveLocalStorage.js";
import { cookies } from "./saveCookie.js";

export const form = document.querySelector(".form");
export const cityNameInputValue = document.querySelector(".form__input");
export const weatherCards = document.querySelector(".weather__cards");
export const weatherLocationList = document.querySelector(".weather__location-list");
export const tabs = document.querySelectorAll(".tab");
export const createEl = (element) => document.createElement(element);

export const convertKelvinToCelsius = (temp) => {
  const celsius = Math.round(parseInt(temp) - 273.15);

  return celsius;
};

export const SECOND = 1000;

export const startCity = cookies.getCurrentCity("currentCity") || storage.getCurrentCity("currentCity") || "Moscow";

export const arrCityList = storage.getFavoriteCities("favoriteCities") || [];
