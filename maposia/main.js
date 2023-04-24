const buttonsNum = document.querySelectorAll('.numBtn')
const display = document.querySelector('.result-block')
const operators = document.querySelectorAll('.operator')
const clearBtn = document.querySelector('.clear')
const results = document.querySelector('.results')

const OPERATORS = {
  PLUS: '+',
  MUNIS: '-',
  MULTIPLY: '*',
  DIVISION: '/',
}

let isClicked = false

let operandA
let operandB
let currentOperator
const resultList = []

function numbers() {
  const outputNum = display.textContent
  if (outputNum.length < 14) {
    if (this.textContent === ',') {
      display.textContent = `${display.textContent}.`
      return
    }
    if (this.textContent === '0' && isClicked) {
      display.textContent = ''
      display.textContent += this.textContent
      return
    }
    if (display.textContent === '0' || isClicked) {
      display.textContent = ''
      display.textContent += this.textContent
      isClicked = false
      return
    } else {
      display.textContent = display.textContent += this.textContent
    }
  }
}

function сalculation(symbol) {
  operandA = Number(display.textContent)
  currentOperator = symbol
  isClicked = true
}

function resultItem() {
  const resultBlock = document.createElement('div')
  const result = document.createElement('p')
  const delBtn = document.createElement('button')

  resultBlock.classList.add('result')
  result.textContent = display.textContent
  delBtn.classList.add('del_btn')
  delBtn.textContent = 'Удалить'
  delBtn.addEventListener('click', () => {
    resultBlock.remove()
  })
  results.appendChild(resultBlock)
  resultBlock.appendChild(result)
  resultBlock.appendChild(delBtn)
}

function calcutale(operator) {
  switch (operator) {
    case OPERATORS.PLUS:
      сalculation(operator)
      return
    case OPERATORS.MUNIS:
      сalculation(operator)
      return
    case OPERATORS.MULTIPLY:
      сalculation(operator)
      return
    case OPERATORS.DIVISION:
      сalculation(operator)
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
      }
      resultItem()
      isClicked = true
      console.log(delButtons)
      return
  }
}

function delBlockResult() {
  console.log('удалить')
}

buttonsNum.forEach((button) => {
  button.addEventListener('click', numbers)
})

operators.forEach((operator) => {
  const operatorValue = operator.textContent
  operator.addEventListener('click', () => {
    calcutale(operatorValue)
  })
})

clearBtn.addEventListener('click', () => {
  display.textContent = '0'
})

const delButtons = document.querySelectorAll('.del_btn')
