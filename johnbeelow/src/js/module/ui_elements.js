const UI_ELEMENTS = {
  SCROLL_FIX: document.querySelector('.window_container'),
  WINDOW_CHAT: document.querySelector('.window_container'),
  MESSAGE_MAIN: document.querySelector('#template--main-user'),
  INPUT_FORM: document.querySelector('.input-form'),
  INPUT_TEXT: document.querySelector('.messenger-form-input'),
}

const clearInput = () => UI_ELEMENTS.INPUT_FORM.reset()

const updateScroll = () => {
  UI_ELEMENTS.SCROLL_FIX.scrollTop = UI_ELEMENTS.SCROLL_FIX.scrollHeight
}


export { UI_ELEMENTS, clearInput, updateScroll }
