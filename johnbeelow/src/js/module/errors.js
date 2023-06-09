class ValidInputError extends Error {
  constructor(message) {
    super(message)
    this.name = 'ValidInputError'
  }
}

const isInputValid = (str) => {
  if (!str || str.trim() === '' || !isNaN(str)) {
    throw new ValidInputError('Введите корректное название города')
  }
}

export { ValidInputError, isInputValid }
