import {
  UI_ELEMENTS,
  clearInput,
  showModal,
  updateScroll,
  showLoader,
} from './module/ui_components.js'

import { getUserCode, changeUserName } from './module/api.js'
import { cookies } from './module/storage.js'

import { handleContentLoaded } from './module/logic.js'

import { updateWebSocket, closeWebSocket } from './module/websocket.js'

import { validationEmail } from './module/ui_components.js'

document.addEventListener('DOMContentLoaded', handleContentLoaded)

window.addEventListener('online', showLoader.online)

window.addEventListener('offline', showLoader.offline)

UI_ELEMENTS.INPUT_FORM.addEventListener('submit', (event) => {
  event.preventDefault()
  updateWebSocket(UI_ELEMENTS.INPUT_TEXT.value)
  clearInput(event)
  updateScroll()
})

UI_ELEMENTS.MODAL_CONTAINER.addEventListener('click', showModal.close)

UI_ELEMENTS.SETTING_BTN.addEventListener('click', (event) => {
  event.preventDefault()
  showModal.open(UI_ELEMENTS.SETTING_BOX)
})

UI_ELEMENTS.ENTER_BTN.addEventListener('click', (event) => {
  event.preventDefault()
  showModal.open(UI_ELEMENTS.AUTHORIZATION_BOX)
})

UI_ELEMENTS.ENTER_CODE_BTN.addEventListener('click', (event) => {
  showModal.clear(event)
  showModal.open(UI_ELEMENTS.VALIDATION_BOX)
})

UI_ELEMENTS.ENTER_MESSENGER.addEventListener('click', (event) => {
  cookies.saveCode(UI_ELEMENTS.VALIDATION_INPUT_TEXT.value)
  showModal.clear(event)
  location.reload()
})

UI_ELEMENTS.GET_CODE.addEventListener('click', (event) => {
  event.preventDefault()
  validationEmail()
  cookies.saveEmail(UI_ELEMENTS.AUTH_IMPUT_TEXT.value)
  getUserCode(UI_ELEMENTS.AUTH_IMPUT_TEXT.value)
})

UI_ELEMENTS.INPUT_SETTING_FORM.addEventListener('submit', (event) => {
  event.preventDefault()
  changeUserName(UI_ELEMENTS.INPUT_SETTING_TEXT.value)
})

UI_ELEMENTS.EXIT_BTN.addEventListener('click', () => {
  cookies.removeCode()
  cookies.removeEmail()
  closeWebSocket()
  location.reload()
})
