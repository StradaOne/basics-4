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
let currentCity = storage.getCurrentCity()
let cityFavoriteList = storage.getFavoriteCities()

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
  currentCity = null
  currentCity = city
  storage.saveCurrentCity(city)
}

const checkInput = (value) => {
  if (isInputValid(value) || !isInputNumber(value)) return
  return getFirstUpperCase(value)
}

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

export {
  currentCity,
  cityFavoriteList,
  isCityExist,
  addCity,
  deleteCity,
  updateCurrentCity,
  checkInput,
}
