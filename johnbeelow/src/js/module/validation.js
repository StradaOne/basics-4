import { CLASS } from "./confing"

const isEmptyArray = (array) => Array.isArray(array) && array.length === 0

const validationEmail = (input, text) => {
  input.onblur = () => {
    if (!input.validity.valid) {
      input.classList.add(CLASS.INVALID)
      text.classList.add(CLASS.SHOW)
    }
  }

  input.onfocus = () => {
    if (input.classList.contains(CLASS.INVALID)) {
      input.classList.remove(CLASS.INVALID)
      text.classList.remove(CLASS.SHOW)
    }
  }
}

export { isEmptyArray, validationEmail }
