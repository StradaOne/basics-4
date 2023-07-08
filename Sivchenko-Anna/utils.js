import {favoriteCities} from "./main.js";
import { UI_ELEMENTS } from "./variables.js";

//* функция проверки на пустую строку

export class EmptyNameError extends Error {
  constructor(message) {
    super(message);
    this.name = "EmptyNameError";
  }
}

export function isInputEmpty(name) {
  if (!name.trim()) {
    throw new EmptyNameError("Введите название города");
  }
  return name;
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

export function convertUnixTime(time, timezone) {
  const date = new Date((time + timezone) * 1000);
  const localDate = date.toLocaleString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  });
  return localDate;
}

// * функция очистки поля ввода города

export function cleanInput() {
  UI_ELEMENTS.FORM.reset();
}