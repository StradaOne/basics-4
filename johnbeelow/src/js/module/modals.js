import { UI_ELEMENTS } from './ui'
import { CLASS } from './confing'

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

export { showModal }
