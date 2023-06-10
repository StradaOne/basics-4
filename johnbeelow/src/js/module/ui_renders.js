import UI_ELEMENTS from './ui_elements'
import calcDate from './business-logic'

const renderDate = (value) => {
  UI_ELEMENTS.RESULT_DATE.textContent = calcDate(value)
}

export default renderDate