const UI_ELEMENTS = {
  NUMBER_ONE: document.querySelector('.input_number_one'),
  NUMBER_TWO: document.querySelector('.input_number_two'),
  OPERATOR: document.querySelector('.operators'),
  BUTTON_RESULT: document.querySelector('.button_result'),
  RESULT: document.querySelector('.result'),
  HISTORY_RESULT: document.querySelector('.history_result_container'),
}

const OPERATIONS = {
  ADD: 'add',
  SUBTRACT: 'subtract',
  MULTI: 'multi',
  DIV: 'div',
}

function calcSum(operation, numberOne, numberTwo) {
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

function updateHistoryConstructor(valueResult) {
  const newDiv = document.createElement('div')
  newDiv.setAttribute('class', 'text_history')
  newDiv.textContent = valueResult

  UI_ELEMENTS.HISTORY_RESULT.appendChild(newDiv)

  newDiv.addEventListener('click', () => {
    newDiv.remove()
  })
}

function getResultConstructor() {
  UI_ELEMENTS.RESULT.textContent = calcSum(
    UI_ELEMENTS.OPERATOR.value,
    UI_ELEMENTS.NUMBER_ONE.value,
    UI_ELEMENTS.NUMBER_TWO.value
  )

  updateHistoryConstructor(UI_ELEMENTS.RESULT.textContent)
}

UI_ELEMENTS.BUTTON_RESULT.addEventListener('click', getResultConstructor)

