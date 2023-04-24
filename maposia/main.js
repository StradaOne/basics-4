const buttonsNum = document.querySelectorAll('.numBtn')
const display = document.querySelector('.result-block')
const operators = document.querySelectorAll('.operator')
const clearBtn = document.querySelector('.clear')

const OPERATORS = {
  PLUS: '+',
  MUNIS: '-',
  MULTIPLY: '*',
  DIVISION: '/',
}

let isClicked = false

buttonsNum.forEach((button) => {
  button.addEventListener('click', () => {
    console.log(button.textContent)
    const outputNum = display.textContent
    if (outputNum.length < 14) {
      if (button.textContent === ',') {
        display.textContent = `${display.textContent}.`
        return
      }
      if (button.textContent === '0' && isClicked) {
        display.textContent = ''
        display.textContent += button.textContent
        return
      }
      if (display.textContent === '0' || isClicked) {
        display.textContent = ''
        display.textContent += button.textContent
        isClicked = false
        return
      } else {
        display.textContent = display.textContent += button.textContent
      }
    }
  })
})

let operandA
let operandB
let currentOperator

function сalculation(symbol) {
  operandA = Number(display.textContent)
  currentOperator = symbol
  isClicked = true
}

operators.forEach((operator) => {
  const operatorValue = operator.textContent
  operator.addEventListener('click', () => {
    switch (operatorValue) {
      case OPERATORS.PLUS:
        сalculation(operatorValue)
        return
      case OPERATORS.MUNIS:
        сalculation(operatorValue)
        return
      case OPERATORS.MULTIPLY:
        сalculation(operatorValue)
        return
      case OPERATORS.DIVISION:
        сalculation(operatorValue)
        return
      case '=':
        operandB = Number(display.textContent)
        if (currentOperator === OPERATORS.PLUS) {
          display.textContent = operandA + operandB
        }
        if (currentOperator === OPERATORS.MUNIS) {
          display.textContent = operandA - operandB
        }
        if (currentOperator === OPERATORS.MULTIPLY) {
          display.textContent = operandA * operandB
        }
        if (currentOperator == OPERATORS.DIVISION) {
          display.textContent = operandA / operandB
          console.log(operandA)
          console.log(operandB)
        }

        return
    }
  })
})

clearBtn.addEventListener('click', () => {
  display.textContent = '0'
})
