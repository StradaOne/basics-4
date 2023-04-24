import { UI_ELEMENTS } from '../module/ui_elements.js'
import { OPERATIONS } from '../module/logic_calc.js'
import { calcSum } from '../module/logic_calc.js'

export function updateHistoryConstructor(valueResult) {
  const newDiv = document.createElement('div')
  newDiv.setAttribute('class', 'text_history')
  newDiv.textContent = valueResult

  UI_ELEMENTS.HISTORY_RESULT.appendChild(newDiv)

  newDiv.addEventListener('click', () => {
    newDiv.remove()
  })
}

export function getResultConstructor() {
  UI_ELEMENTS.RESULT.textContent = calcSum(
    UI_ELEMENTS.OPERATOR.value,
    UI_ELEMENTS.NUMBER_ONE.value,
    UI_ELEMENTS.NUMBER_TWO.value
  )

  updateHistoryConstructor(UI_ELEMENTS.RESULT.textContent)
}

