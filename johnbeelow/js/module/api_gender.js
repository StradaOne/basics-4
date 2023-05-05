import { render } from '../main.js'
import { CLASS_GENDER } from './ui_elements.js'

const API = {
  URL_SERVER: 'https://api.genderize.io',
  URL_NAME: '?name=',
}

export const API_LOG = {
  SERVER_COMPLETE: 'The server response is successful',
  SERVER_ERROR: 'Error loading data',
  GENDER_IS_NOT: 'Gender is not defined',
  MESSAGE_ERROR: 'Erorr',
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
}

const checkInput = (value) => {
  if (isInputValid(value) || !isInputNumber(value)) return
  return getFirstUpperCase(value)
}

export function getGenderColor(gender) {
  switch (gender) {
    case 'male':
      return CLASS_GENDER.MALE
    case 'female':
      return CLASS_GENDER.FEMALE
    case null:
      return CLASS_GENDER.UNKOWN
  }
}

export async function showGender(name) {
  try {
    const firstName = checkInput(name)
    if (!firstName) return

    const url = `${API.URL_SERVER}${API.URL_NAME}${firstName}`
    const response = await fetch(url)

    if (response.ok) {
      console.warn(API_LOG.SERVER_COMPLETE)
      const result = await response.json()
      const color = getGenderColor(result.gender)
      render(`${firstName} is ${result.gender}`, color)
    }

    if (!response.ok) {
      console.error(`${API_LOG.SERVER_ERROR}: ${response.status}`)
    }
  } catch (error) {
    console.error(`${API_LOG.MESSAGE_ERROR}: ${error.message}`)
  }
}
