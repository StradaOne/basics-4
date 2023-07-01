function getElement(tag) {
  return document.querySelector(tag)
}

const VARIABLES = {
  ELEMENTS: {
    SETTING: {
      OPEN: getElement('.chat__header__setting__icon'),
      NODE: getElement('.chat__setting'),
      CLOSE: getElement('.chat__setting__close')
    },
    MESSAGES_NODE: getElement('.chat__messages'),
    TEMPLATE: getElement('#template_chat_message'),
    CHAT_INPUT: getElement('.chat__form__input'),
    FORM: getElement('.chat__form'),

    AUTH: {
      FORM: getElement('.chat__auth__form'),
      INPUT: getElement('.chat__auth__input')
    }
  }
}


export default VARIABLES