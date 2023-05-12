import { API } from './data.js'

export const STATUS = {
  ACTIVE: 'Active',
  FAVORITE: 'Favorite',
}

export let currentCity = API.START_CITY

export let cityFavoriteList = []

export const isInputValid = (str) => !str || str.trim() === ''

export const isInputNumber = (number) => isNaN(number)

export const isLowerCase = (str) => str === str.toLowerCase()

export const isUpperCase = (str) => str === str.toUpperCase()

export const getFirstUpperCase = (str) => {
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

export const isCityExist = (name) =>
  cityFavoriteList.find((city) => city.name === name)

const findIndexCity = (name) =>
  cityFavoriteList.findIndex((city) => city.name === name)

export const addCity = (name) => {
  if (isCityExist(name)) return
  cityFavoriteList.push({ name })
}

export const deleteCity = (name) => {
  cityFavoriteList.splice(findIndexCity(name), 1)
}
export function updateCurrentCity(city) {
  currentCity = city
}

