const isInputValid = (str) => !str || str.trim() === ''
const isInputNumber = (number) => isNaN(number)

export const checkInput = (value) => {
  if (isInputValid(value) || !isInputNumber(value)) return
  return value
  
}
