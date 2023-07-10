import { convertTime } from './utils'
import { UI_ELEMENTS, updateScroll } from './ui'
import { CLASS } from './confing.js'
import { cookies } from './storage'

const renderSystemMessage = (text) => {
  const message = UI_ELEMENTS.MESSAGE_SYSTEM.content.cloneNode(true)
  message.querySelector(CLASS.SYSTEM_MESSAGE).textContent = text
  UI_ELEMENTS.WINDOW_CHAT.prepend(message)
}

const parseHistoryMessage = (massage) => {
  const data = {
    user: massage.user.name,
    email: massage.user.email,
    text: massage.text,
    time: massage.createdAt,
  }
  renderHistory(data)
}

const renderHistory = ({ user, email, text, time }) => {
  const userMain = UI_ELEMENTS.MESSAGE_MAIN.content.cloneNode(true)
  const userOnly = UI_ELEMENTS.MESSAGE_ONLY.content.cloneNode(true)
  const userValidation = cookies.getEmail()

  if (userValidation === email) {
    userMain.querySelector(CLASS.MESSAGE_TEXT).textContent = text
    userMain.querySelector(CLASS.MESSAGE_DATE).textContent = convertTime(time)
    UI_ELEMENTS.WINDOW_CHAT.prepend(userMain)
  }

  if (userValidation !== email) {
    userOnly.querySelector(CLASS.MESSAGE_ONLY).textContent = user
    userOnly.querySelector(CLASS.MESSAGE_TEXT).textContent = text
    userOnly.querySelector(CLASS.MESSAGE_DATE).textContent = convertTime(time)
    UI_ELEMENTS.WINDOW_CHAT.prepend(userOnly)
  }
}

const parseMessage = (massage) => {
  const data = {
    user: massage.user.name,
    email: massage.user.email,
    text: massage.text,
    time: massage.createdAt,
  }
  renderMassages(data)
}

const renderMassages = ({ user, email, text, time }) => {
  const userMain = UI_ELEMENTS.MESSAGE_MAIN.content.cloneNode(true)
  const userOnly = UI_ELEMENTS.MESSAGE_ONLY.content.cloneNode(true)
  const userValidation = cookies.getEmail()

  if (userValidation === email) {
    userMain.querySelector(CLASS.MESSAGE_TEXT).textContent = text
    userMain.querySelector(CLASS.MESSAGE_DATE).textContent = convertTime(time)
    UI_ELEMENTS.WINDOW_CHAT.append(userMain)
    updateScroll()
  }

  if (userValidation !== email) {
    userOnly.querySelector(CLASS.MESSAGE_ONLY).textContent = user
    userOnly.querySelector(CLASS.MESSAGE_TEXT).textContent = text
    userOnly.querySelector(CLASS.MESSAGE_DATE).textContent = convertTime(time)
    UI_ELEMENTS.WINDOW_CHAT.append(userOnly)
  }
}

export { renderSystemMessage, parseMessage, parseHistoryMessage }
