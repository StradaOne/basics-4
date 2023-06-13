import { ValidInputError, isInputValid } from './errors.js'

const storage = {
  saveFavoriteCities(cityFavoriteList) {
    try {
      localStorage.setItem(
        'cityFavoriteList',
        JSON.stringify(Array.from(cityFavoriteList))
      )
    } catch (error) {
      console.error(error.message)
    }
  },

  saveCurrentCity(currentCity) {
    try {
      localStorage.setItem('currentCity', JSON.stringify(currentCity))
    } catch (error) {
      console.error(error.message)
    }
  },

  getFavoriteCities() {
    try {
      const storedCities = localStorage.getItem('cityFavoriteList')
      return storedCities ? new Set(JSON.parse(storedCities)) : new Set()
    } catch (error) {
      console.error(error.message)
      return new Set()
    }
  },

  getCurrentCity() {
    try {
      const storedCity = localStorage.getItem('currentCity')
      return storedCity ? JSON.parse(storedCity) : defaultCity
    } catch (error) {
      console.error(error.message)
      return defaultCity
    }
  },
}

const defaultCity = 'Miami'
let cityFavoriteList = storage.getFavoriteCities()
let currentCity = storage.getCurrentCity()

const isCityExist = (name) => cityFavoriteList.has(name)

const addCity = (name) => {
  if (isCityExist(name)) return
  cityFavoriteList.add(name)
  storage.saveFavoriteCities(cityFavoriteList)
}

const deleteCity = (name) => {
  cityFavoriteList.delete(name)
  storage.saveFavoriteCities(cityFavoriteList)
}

const updateCurrentCity = (city) => {
  currentCity = city
  storage.saveCurrentCity(city)
}

const checkInput = (value) => {
  try {
    isInputValid(value)
    return getFirstUpperCase(value)
  } catch (error) {
    if (error instanceof ValidInputError) {
      console.log(error.message)
    } else {
      throw error
    }
  }
}

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

export {
  currentCity,
  cityFavoriteList,
  isCityExist,
  addCity,
  deleteCity,
  updateCurrentCity,
  checkInput,
}
