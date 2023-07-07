const UI_ELEMENTS = {
  SCROLL_FIX: document.querySelector('.window_container'),
  WINDOW_CHAT: document.querySelector('.window_container'),
  MESSAGE_MAIN: document.querySelector('#template--main-user'),
  MESSAGE_ONLY: document.querySelector('#template--only-user'),
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
  VALIDATION_INPUT_TEXT: document.querySelector('.modal-validation-form-input'),
  INPUT_SETTING_FORM: document.querySelector('.modal-form-setting-input'),
  INPUT_SETTING_TEXT: document.querySelector('.modal-setting-form-input'),
  IMG_COMPLETE: document.querySelector('.img_complete'),
  IMG_ERROR: document.querySelector('.img_error'),
  LOADER: document.querySelector('.loader'),
  LOADER_DISCONECTED: document.querySelector('.loader-disconected'),
  ERROR_EMAIL: document.querySelector('.email-error'),
}

const CLASS = {
  SHOW: 'show',
  CLOSE: 'close',
  MESSAGE_TEXT: '.message-text',
  MESSAGE_DATE: '.message-date',
  MESSAGE_MAIN: '.message-text--main-user',
  MESSAGE_ONLY: '.message-text--users',
  BTN_CLOSE: '.modal-btn-close',
  MODAL_CONTAINER: '.modal-container',
  MODAL_BOX: '.modal-box',
  INVALID: 'invalid',
}

const clearInput = (event) => {
  const target = event.target
  target.reset()
}

const updateScroll = () => {
  UI_ELEMENTS.SCROLL_FIX.scrollTop = UI_ELEMENTS.SCROLL_FIX.scrollHeight
}

const showModal = {
  close: (event) => {
    const target = event.target
    const closeButton = target.closest(CLASS.BTN_CLOSE)
    const container = target.closest(CLASS.MODAL_CONTAINER)
    const box = target.closest(CLASS.MODAL_BOX)

    if (target === closeButton) {
      container.classList.remove(CLASS.SHOW)
      box.classList.remove(CLASS.SHOW)
    }
  },

  open: (box) => {
    UI_ELEMENTS.MODAL_CONTAINER.classList.add(CLASS.SHOW)
    box.classList.add(CLASS.SHOW)
  },

  clear: (event) => {
    const target = event.target
    const box = target.closest(CLASS.MODAL_BOX)
    const container = target.closest(CLASS.MODAL_CONTAINER)

    container.classList.remove(CLASS.SHOW)
    box.classList.remove(CLASS.SHOW)
  },
}

const replaceIcon = (openIcon, closeIcon) => {
  openIcon.classList.add(CLASS.SHOW)
  openIcon.classList.remove(CLASS.CLOSE)
  closeIcon.classList.remove(CLASS.SHOW)
  closeIcon.classList.add(CLASS.CLOSE)
}

const showStatus = {
  complete: () => {
    UI_ELEMENTS.IMG_COMPLETE.classList.add(CLASS.SHOW)
    setTimeout(() => {
      UI_ELEMENTS.IMG_COMPLETE.classList.remove(CLASS.SHOW)
    }, 1000)
  },
  error: () => {
    UI_ELEMENTS.IMG_ERROR.classList.add(CLASS.SHOW)
    setTimeout(() => {
      UI_ELEMENTS.IMG_ERROR.classList.remove(CLASS.SHOW)
    }, 1000)
  },
}

const showLoader = {
  open: () => UI_ELEMENTS.LOADER.classList.add(CLASS.SHOW),
  close: () => UI_ELEMENTS.LOADER.classList.remove(CLASS.SHOW),
  online: () => UI_ELEMENTS.LOADER_DISCONECTED.classList.remove(CLASS.SHOW),
  offline: () => UI_ELEMENTS.LOADER_DISCONECTED.classList.add(CLASS.SHOW),
}

const validationEmail = () => {
  const input = UI_ELEMENTS.AUTH_IMPUT_TEXT
  const text = UI_ELEMENTS.ERROR_EMAIL

  input.onblur = () => {
    if (!input.validity.valid) {
      input.classList.add(CLASS.INVALID)
      text.classList.add(CLASS.SHOW)
    }
  }

  input.onfocus = () => {
    if (input.classList.contains(CLASS.INVALID)) {
      input.classList.remove(CLASS.INVALID)
      text.classList.remove(CLASS.SHOW)
    }
  }
}

export {
  UI_ELEMENTS,
  CLASS,
  updateScroll,
  clearInput,
  replaceIcon,
  showModal,
  showStatus,
  showLoader,
  validationEmail,
}
