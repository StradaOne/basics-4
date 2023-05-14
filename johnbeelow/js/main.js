import { UI_ELEMENTS, clearInput, animateIcon } from './module/ui_elements.js'

import {
  handleContentLoaded,
  processingInputRequest,
  getToggleLikeAction,
  changeActiveButton,
} from './module/business-logic.js'

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => (UI_ELEMENTS.LOADER.style.display = 'none'), 1000)
})

document.addEventListener('DOMContentLoaded', handleContentLoaded)

window.addEventListener('online', () => {
  UI_ELEMENTS.LOADER.style.display = 'none'
})

window.addEventListener('offline', () => {
  UI_ELEMENTS.LOADER.style.display = 'flex'
})

for (let button of UI_ELEMENTS.BUTTONS_ALL) {
  button.addEventListener('click', changeActiveButton)
}

UI_ELEMENTS.INPUT_FORM.addEventListener('submit', (event) => {
  event.preventDefault()
  processingInputRequest(UI_ELEMENTS.INPUT_TEXT.value)
  animateIcon()
  clearInput()
})

UI_ELEMENTS.LIKE.addEventListener('click', (event) => {
  event.preventDefault()
  getToggleLikeAction()
})
