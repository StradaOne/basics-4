import { UI_ELEMENTS, clearInput, updateScroll } from './module/ui_elements.js'
import { convertTime } from './module/utils.js'

const createMainMassage = (value) => {
  if (value.trim() !== '') {
    const message = UI_ELEMENTS.MESSAGE_MAIN.content.cloneNode(true)
    message.querySelector('.message-text').textContent = value
    message.querySelector('.message-date').textContent = convertTime()
    UI_ELEMENTS.WINDOW_CHAT.append(message)
  }
}

UI_ELEMENTS.INPUT_FORM.addEventListener('submit', (event) => {
  event.preventDefault()
  createMainMassage(UI_ELEMENTS.INPUT_TEXT.value)
  clearInput()
  updateScroll()
})
