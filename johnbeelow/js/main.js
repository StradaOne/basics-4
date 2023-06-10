import { UI_ELEMENTS, clearInput, animateIcon } from './module/ui_elements.js'

import {
  handleContentLoaded,
  handleSendingData,
  getToggleLikeAction,
  changeActiveButton,
} from './module/business-logic.js'

document.addEventListener('DOMContentLoaded', () => {
  UI_ELEMENTS.LOADER_DISCONECTED.style.display = 'none'
})

document.addEventListener('DOMContentLoaded', handleContentLoaded)

for (let button of UI_ELEMENTS.BUTTONS_ALL) {
  button.addEventListener('click', changeActiveButton)
}

UI_ELEMENTS.INPUT_FORM.addEventListener('submit', (event) => {
  event.preventDefault()
  handleSendingData(UI_ELEMENTS.INPUT_TEXT.value)
  animateIcon()
  clearInput()
})

UI_ELEMENTS.LIKE.addEventListener('click', (event) => {
  event.preventDefault()
  getToggleLikeAction()
})

window.addEventListener('online', () => {
  UI_ELEMENTS.LOADER_DISCONECTED.style.display = 'none'
})

window.addEventListener('offline', () => {
  UI_ELEMENTS.LOADER_DISCONECTED.style.display = 'flex'
})
