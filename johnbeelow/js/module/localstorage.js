import { API } from './data.js'

const isInputValid = (str) => !str || str.trim() === ''
const isInputNumber = (number) => isNaN(number)
const isLowerCase = (str) => str === str.toLowerCase()
const isUpperCase = (str) => str === str.toUpperCase()

const getFirstUpperCase = (str) => {
  if (isLowerCase(str)) {
    return str[0].toUpperCase() + str.slice(1)
  }
  if (isUpperCase(str)) {
    return str[0].toUpperCase() + str.slice(1).toLowerCase()
  }
  return str
}

export const checkInput = (value) => {
  if (isInputValid(value) || !isInputNumber(value)) return
  return getFirstUpperCase(value)
}

const storage = {
  saveFavoriteCities: (cityFavoriteList) => {
    localStorage.setItem('cityFavoriteList', JSON.stringify(cityFavoriteList))
  },
  saveCurrentCity: (currentCity) => {
    localStorage.setItem('currentCity', JSON.stringify(currentCity))
  },
  getFavoriteCities: () => {
    const storedCities = localStorage.getItem('cityFavoriteList')
    if (storedCities) {
      return JSON.parse(storedCities)
    }
    return []
  },
  getCurrentCity: () => {
    const storedCity = localStorage.getItem('currentCity')
    if (storedCity) {
      return JSON.parse(storedCity)
    }
    return API.START_CITY
  },
}

export let currentCity = storage.getCurrentCity()
export let cityFavoriteList = storage.getFavoriteCities()

export const isCityExist = (name) =>
  cityFavoriteList.find((city) => city.name === name)

const findIndexCity = (name) =>
  cityFavoriteList.findIndex((city) => city.name === name)

export const addCity = (name) => {
  if (isCityExist(name)) return
  cityFavoriteList.push({ name })
  storage.saveFavoriteCities(cityFavoriteList)
}

export const deleteCity = (name) => {
  cityFavoriteList.splice(findIndexCity(name), 1)
  storage.saveFavoriteCities(cityFavoriteList)
}

export function updateCurrentCity(city) {
  currentCity = null
  currentCity = city
  storage.saveCurrentCity(city)
}
