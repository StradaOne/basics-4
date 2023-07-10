import {
  UI_ELEMENTS,
  clearInput,
  showLoader,
  replaceIcon,
} from './module/ui.js'

import {
  connectWebSocket,
  sendMassage,
  closeWebSocket,
} from './module/websocket.js'

import { showModal } from './module/modals.js'

import { getUserCode, changeUserName } from './module/api.js'

import { cookies } from './module/storage.js'

import { appendHistory } from './module/business-logic.js'

import { SYSTEM_MESSAGE } from './module/confing.js'

import { renderSystemMessage } from './module/message.js'

import { validationEmail } from './module/validation.js'

const handleContentLoaded = () => {
  const token = cookies.getCode()
  if (token) {
    replaceIcon(UI_ELEMENTS.EXIT_BTN, UI_ELEMENTS.ENTER_BTN)
    connectWebSocket(token)
    appendHistory()
  }
  if (!token) {
    renderSystemMessage(SYSTEM_MESSAGE.NO_ENTRY)
  }
}

document.addEventListener('DOMContentLoaded', handleContentLoaded)

window.addEventListener('online', showLoader.online)

window.addEventListener('offline', showLoader.offline)

UI_ELEMENTS.WINDOW_CHAT.addEventListener('scroll', () => {
  if (UI_ELEMENTS.WINDOW_CHAT.scrollTop === 0) {
    appendHistory()
  }
})

UI_ELEMENTS.INPUT_FORM.addEventListener('submit', (event) => {
  event.preventDefault()
  sendMassage(UI_ELEMENTS.INPUT_TEXT.value)
  clearInput(event)
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
  validationEmail(UI_ELEMENTS.AUTH_IMPUT_TEXT, UI_ELEMENTS.ERROR_EMAIL)
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
