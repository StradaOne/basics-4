function getElement(tag) {
  return document.querySelector(tag)
}

const VARIABLES = {
  ELEMENTS: {
    MESSAGES_NODE: getElement('.chat__messages'),
    TEMPLATE: getElement('#template_chat_message'),
    CHAT_INPUT: getElement('.chat__form__input'),
    FORM: getElement('.chat__form')
  }
}

export default VARIABLES