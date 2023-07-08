import {
  UI_ELEMENTS,
  clearInput,
  replaceIcon,
  showModal,
  updateScroll,
  showLoader,
} from './module/ui_components.js'

import { getUserCode, changeUserName } from './module/api.js'
import { cookies } from './module/storage.js'

import { handleContentLoaded, createMainUserMassage } from './module/logic.js'

document.addEventListener('DOMContentLoaded', handleContentLoaded)

window.addEventListener('online', showLoader.online)

window.addEventListener('offline', showLoader.offline)

UI_ELEMENTS.INPUT_FORM.addEventListener('submit', (event) => {
  event.preventDefault()
  createMainUserMassage(UI_ELEMENTS.INPUT_TEXT.value)
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
  replaceIcon(UI_ELEMENTS.EXIT_BTN, UI_ELEMENTS.ENTER_BTN)
})

UI_ELEMENTS.GET_CODE.addEventListener('click', (event) => {
  event.preventDefault()
  getUserCode(UI_ELEMENTS.AUTH_IMPUT_TEXT.value)
})

UI_ELEMENTS.INPUT_SETTING_FORM.addEventListener('submit', (event) => {
  event.preventDefault()
  changeUserName(UI_ELEMENTS.INPUT_SETTING_TEXT.value)
})
