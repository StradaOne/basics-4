const UI_ELEMENTS = {
  NUMBER_ONE: document.querySelector('.input_number_one'),
  NUMBER_TWO: document.querySelector('.input_number_two'),
  OPERATOR: document.querySelector('.operators'),
  BUTTON_RESULT: document.querySelector('.button_result'),
  RESULT: document.querySelector('.result'),
}

const OPERATIONS = {
  ADD: 'add',
  SUBTRACT: 'subtract',
  MULTI: 'multi',
  DIV: 'div',
}

function sumCalculator(operation, numberOne, numberTwo) {
  switch (operation) {
    case OPERATIONS.ADD:
      return +numberOne + +numberTwo
    case OPERATIONS.SUBTRACT:
      return numberOne - numberTwo
    case OPERATIONS.MULTI:
      return numberOne * numberTwo
    case OPERATIONS.DIV:
      return numberOne / numberTwo
  }
}

UI_ELEMENTS.BUTTON_RESULT.addEventListener('click', () => {
  UI_ELEMENTS.RESULT.textContent = sumCalculator(
    UI_ELEMENTS.OPERATOR.value,
    UI_ELEMENTS.NUMBER_ONE.value,
    UI_ELEMENTS.NUMBER_TWO.value
  )
})
