import { convertTime } from './utils.js'

const UI_ELEMENTS = {
  SCROLL_FIX: document.querySelector('.window_container'),
  WINDOW_CHAT: document.querySelector('.window_container'),
  MESSAGE_MAIN: document.querySelector('#template--main-user'),
  MESSAGE_WELCOME: document.querySelector('#welcome-message'),
  INPUT_FORM: document.querySelector('.input-form'),
  INPUT_TEXT: document.querySelector('.messenger-form-input'),
  MODAL_CONTAINER: document.querySelector('.modal-container'),
  SETTING_BTN: document.querySelector('.btn-setting'),
  SETTING_BOX: document.querySelector('.box-setting'),
  ENTER_BTN: document.querySelector('.btn-enter'),
  EXIT_BTN: document.querySelector('.btn-exit'),
  AUTHORIZATION_BOX: document.querySelector('.box-authorization'),
  ENTER_CODE_BTN: document.querySelector('.enter-code'),
  VALIDATION_BOX: document.querySelector('.box-validation'),
  ENTER_MESSENGER: document.querySelector('.enter-validation'),
  EMODJI_BTN: document.querySelector('.emodji-messenger'),
  EMODJI_BOX: document.querySelector('.box-emodji'),
  AUTH_IMPUT_TEXT: document.querySelector('.modal-auth-form-input'),
  GET_CODE: document.querySelector('.get-code'),
}


const clearInput = () => {
  return UI_ELEMENTS.INPUT_FORM.reset()
}

const updateScroll = () => {
  UI_ELEMENTS.SCROLL_FIX.scrollTop = UI_ELEMENTS.SCROLL_FIX.scrollHeight
}

const createUsersMassage = (value, template = UI_ELEMENTS.MESSAGE_MAIN) => {
  if (value.trim() !== '') {
    const message = template.content.cloneNode(true)
    message.querySelector('.message-text').textContent = value
    message.querySelector('.message-date').textContent = convertTime()
    UI_ELEMENTS.WINDOW_CHAT.append(message)
  }
}

const createBotMassage = (template) => {
  setTimeout(() => {
    const message = template.content.cloneNode(true)
    message.querySelector('.message-date').textContent = convertTime()
    UI_ELEMENTS.WINDOW_CHAT.append(message)
  }, 500)
}

const showModal = {
  close: (event) => {
    const target = event.target
    const closeButton = target.closest('.modal-btn-close')
    const container = target.closest('.modal-container')
    const box = target.closest('.modal-box')

    if (target === closeButton) {
      container.classList.remove('show')
      box.classList.remove('show')
    }
  },

  open: (box) => {
    UI_ELEMENTS.MODAL_CONTAINER.classList.add('show')
    box.classList.add('show')
  },

  clear: (event) => {
    const target = event.target
    const box = target.closest('.modal-box')
    const container = target.closest('.modal-container')

    container.classList.remove('show')
    box.classList.remove('show')
  },
}

const replaceIcon = (openIcon, closeIcon) => {
  openIcon.classList.add('show')
  openIcon.classList.remove('close')
  closeIcon.classList.remove('show')
  closeIcon.classList.add('close')
}

export {
  UI_ELEMENTS,
  createUsersMassage,
  createBotMassage,
  updateScroll,
  clearInput,
  replaceIcon,
  showModal,
}
