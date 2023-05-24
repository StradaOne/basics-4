import { setArrCityList } from "./constants.js";

export const createEl = (element) => document.createElement(element);

export const convertKelvinToCelsius = (temp) => {
  const celsius = Math.round(parseInt(temp) - 273.15);

  return celsius;
};

export const convertUnixTimeToTime = (unixTime, timeZone) => {
  const date = new Date(unixTime * 1000);
  const tZone = Intl.DateTimeFormat().resolvedOptions()[timeZone];
  const timeOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: false,
    timeZone: tZone,
  };
  return new Intl.DateTimeFormat("default", timeOptions).format(date);
};

export const convertUnixTimeToDate = (unixTime, timeZone) => {
  const date = new Date(unixTime * 1000);
  const tZone = Intl.DateTimeFormat().resolvedOptions()[timeZone];
  const dateOptions = {
    day: "numeric",
    month: "short",
    timeZone: tZone,
  };
  return new Intl.DateTimeFormat("default", dateOptions).format(date);
};

export const checkCityInList = (option) => {
  const { city, cityList } = option;
  const setCities = new Set(cityList);

  return setCities.has(city);
};

export const addCityToList = (option) => {
  const { array, element } = option;
  const setCities = new Set(array);

  setCities.add(element);

  setArrCityList([...setCities]);

  return [...setCities];
};

export const removeCityFromList = (option) => {
  const { array, element } = option;
  const setCities = new Set(array);

  setCities.delete(element);

  setArrCityList([...setCities]);

  return [...setCities];
};
