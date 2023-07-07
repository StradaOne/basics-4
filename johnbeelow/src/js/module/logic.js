import { getHistoryChat } from './api.js'
import { UI_ELEMENTS, CLASS, updateScroll, replaceIcon } from './ui_components.js'
import { convertTime } from './utils.js'
import { cookies } from './storage.js'
import { createWebSocket } from './websocket.js'

const handleContentLoaded = () => {
  const token = cookies.getCode()
  if (token) {
    replaceIcon(UI_ELEMENTS.EXIT_BTN, UI_ELEMENTS.ENTER_BTN)
    repeatRequest()
    createWebSocket(token)
  }
  if (!token) {
    console.log('Войдите');
  }
}

const repeatRequest = async () => {
  const data = await getHistoryChat()
  await data.map((messages) => parseMessage(messages))
}

const parseMessage = (massage) => {
  const data = {
    user: massage.user.name,
    email: massage.user.email,
    text: massage.text,
    time: massage.createdAt,
  }
  createMassages(data)
  updateScroll()
}

const createMassages = ({ user, email, text, time }) => {
  const userMain = UI_ELEMENTS.MESSAGE_MAIN.content.cloneNode(true)
  const userOnly = UI_ELEMENTS.MESSAGE_ONLY.content.cloneNode(true)
  const userValidation = cookies.getEmail()

  if (userValidation === email) {
    userMain.querySelector(CLASS.MESSAGE_TEXT).textContent = text
    userMain.querySelector(CLASS.MESSAGE_DATE).textContent = convertTime(time)
    UI_ELEMENTS.WINDOW_CHAT.append(userMain)
  }

  if (userValidation !== email) {
    userOnly.querySelector(CLASS.MESSAGE_ONLY).textContent = user
    userOnly.querySelector(CLASS.MESSAGE_TEXT).textContent = text
    userOnly.querySelector(CLASS.MESSAGE_DATE).textContent = convertTime(time)
    UI_ELEMENTS.WINDOW_CHAT.append(userOnly)
  }
}

export {
  handleContentLoaded,
  parseMessage,
  repeatRequest,
}
