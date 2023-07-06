function getElement(tag) {
  return document.querySelector(tag)
}

//переделать константы
const VARIABLES = {
  ELEMENTS: {
    SETTING: {
      OPEN: getElement('.chat__header__setting__icon'),
      NODE: getElement('.chat__setting'),
      CLOSE: getElement('.chat__setting__close'),
      FORM: getElement('.chat__setting'),
      INPUT: getElement('.chat__setting__input')
    },
    MESSAGES_NODE: getElement('.chat__messages'),
    TEMPLATE: getElement('#template_chat_message'),
    CHAT_INPUT: getElement('.chat__form__input'),
    SUBMIT: getElement('.chat__form'),
    MAIN_USERNAME: getElement('.chat__header__user__name'),
    AUTH: {
      FORM: getElement('.chat__auth__form'),
      INPUT: getElement('.chat__auth__input'),
      NODE: getElement('.chat__auth'),
      MESSAGE: getElement('.chat__auth__input__message'),
      VERIFICATION: {
        FORM: getElement('.chat__login__form'),
        INPUT: getElement('.chat__login__input')
      }
    }
  }
}

const URL = {}
const BLOCKS = {
  AUTH: getElement('.chat__auth__form'),
  VERIFICATION: getElement('.chat__login__form')
}


export { VARIABLES, BLOCKS }