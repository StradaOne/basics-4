import {favoriteCities} from "./main.js";
import { UI_ELEMENTS } from "./variables.js";

//* функция проверки на пустую строку

export function isInputEmpty(name) {
  return !name.trim();
}

//* функция поиска индекса в массиве

export function findIndex(name) {
  return favoriteCities.findIndex((item) => item.location === name);
}

//* функция проверки наличия города в массиве

export function isCityExist(name) {
  return favoriteCities.find((item) => item.location === name);
}

// * функция конвертирования времени из unix-формата

export function convertUnixTime(time) {
  const date = new Date(time * 1000);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

// * функция очистки поля ввода города

export function cleanInput() {
  UI_ELEMENTS.FORM.reset();
}