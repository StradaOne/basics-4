export const OPERATIONS = {
  ADD: 'add',
  SUBTRACT: 'subtract',
  MULTI: 'multi',
  DIV: 'div',
}

export function calcSum(operation, numberOne, numberTwo) {
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

