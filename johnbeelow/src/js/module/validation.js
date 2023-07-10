const isEmptyArray = (array) => Array.isArray(array) && array.length === 0

const isInputValidation = (input) => input.validity.valid

export { isEmptyArray, isInputValidation }
