import {
  UI_ELEMENTS,
  clearInput,
  createUsersMassage,
  createBotMassage,
  replaceIcon,
  showModal,
  updateScroll,
} from './module/ui_components.js'

import { getCodeUser } from './module/api.js'

UI_ELEMENTS.INPUT_FORM.addEventListener('submit', (event) => {
  event.preventDefault()
  createUsersMassage(UI_ELEMENTS.INPUT_TEXT.value)
  clearInput()
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
  showModal.clear(event)
  replaceIcon(UI_ELEMENTS.EXIT_BTN, UI_ELEMENTS.ENTER_BTN)
  createBotMassage(UI_ELEMENTS.MESSAGE_WELCOME)
})

UI_ELEMENTS.GET_CODE.addEventListener('click', (event) => {
  event.preventDefault()
  getCodeUser(UI_ELEMENTS.AUTH_IMPUT_TEXT.value)
})
