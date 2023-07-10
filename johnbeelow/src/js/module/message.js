import { convertTime } from './utils'
import { UI_ELEMENTS, updateScroll } from './ui'
import { CLASS } from './confing.js'
import { cookies } from './storage.js'
import { TYPE } from './confing.js'

const { MESSAGE } = TYPE

const renderSystemMessage = (text) => {
  const message = UI_ELEMENTS.MESSAGE_SYSTEM.content.cloneNode(true)
  message.querySelector(CLASS.SYSTEM_MESSAGE).textContent = text
  UI_ELEMENTS.WINDOW_CHAT.prepend(message)
}

const parseMessage = (massage, type) => {
  const data = {
    user: massage.user.name,
    email: massage.user.email,
    text: massage.text,
    time: massage.createdAt,
    type: type
  }
  renderMessage(data)
}

const renderMessage = ({ user, email, text, time, type } ) => {

  const userMain = UI_ELEMENTS.MESSAGE_MAIN.content.cloneNode(true)
  const userOnly = UI_ELEMENTS.MESSAGE_ONLY.content.cloneNode(true)
  const userValidation = cookies.getEmail()

  if (userValidation === email) {
    userMain.querySelector(CLASS.MESSAGE_MAIN).textContent = user
    userMain.querySelector(CLASS.MESSAGE_TEXT).textContent = text
    userMain.querySelector(CLASS.MESSAGE_DATE).textContent = convertTime(time)

    if (type === MESSAGE.UP) {
      UI_ELEMENTS.WINDOW_CHAT.append(userMain)
      updateScroll()
    }

    if (type === MESSAGE.DOWN) {
      UI_ELEMENTS.WINDOW_CHAT.prepend(userMain)
    }
  }

  if (userValidation !== email) {
    userOnly.querySelector(CLASS.MESSAGE_ONLY).textContent = user
    userOnly.querySelector(CLASS.MESSAGE_TEXT).textContent = text
    userOnly.querySelector(CLASS.MESSAGE_DATE).textContent = convertTime(time)

    if (type === MESSAGE.UP) {
      UI_ELEMENTS.WINDOW_CHAT.append(userOnly)
    }

    if (type === MESSAGE.DOWN) {
      UI_ELEMENTS.WINDOW_CHAT.prepend(userOnly)
    }
  }
}


export { renderSystemMessage, parseMessage }
