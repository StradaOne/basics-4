import {
  showLoader,
  clearInput,
  replaceIcon,
  UI_ELEMENTS,
} from './module/ui.js'

import {
  sendMassage,
  closeWebSocket,
  connectWebSocket,
} from './module/websocket.js'

import { userMain } from './module/user.js'

import { showModal } from './module/modals.js'

import { validationEmail } from './module/ui.js'

import { renderSystemMessage } from './module/message.js'

import { appendHistory } from './module/business-logic.js'

import { getUserCode, changeUserName } from './module/api.js'

import { SYSTEM_MESSAGE, USER_STATE } from './module/confing.js'

const handleContentLoaded = () => {
  if (userMain.token && userMain.email) {
    replaceIcon(UI_ELEMENTS.EXIT_BTN, UI_ELEMENTS.ENTER_BTN)
    connectWebSocket(userMain.token)
    appendHistory()

    if (!userMain.name) {
      changeUserName(USER_STATE.GUEST)
      renderSystemMessage(SYSTEM_MESSAGE.NO_NAME)
    }
  }

  if (!userMain.token || !userMain.email) {
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
  userMain.setToken(UI_ELEMENTS.VALIDATION_INPUT_TEXT.value)
  showModal.clear(event)
  location.reload()
})

UI_ELEMENTS.GET_CODE.addEventListener('click', (event) => {
  event.preventDefault()
  validationEmail(UI_ELEMENTS.AUTH_IMPUT_TEXT, UI_ELEMENTS.ERROR_EMAIL)
  userMain.setEmail(UI_ELEMENTS.AUTH_IMPUT_TEXT.value)
  getUserCode(UI_ELEMENTS.AUTH_IMPUT_TEXT.value)
})

UI_ELEMENTS.INPUT_SETTING_FORM.addEventListener('submit', (event) => {
  event.preventDefault()
  if (userMain.token && userMain.email) {
    changeUserName(UI_ELEMENTS.INPUT_SETTING_TEXT.value)
    userMain.setName(UI_ELEMENTS.INPUT_SETTING_TEXT.value)
  }
})

UI_ELEMENTS.EXIT_BTN.addEventListener('click', (event) => {
  event.preventDefault()
  userMain.logout()
  closeWebSocket()
  location.reload()
})
