import { getHistoryChat } from './api.js'
import { UI_ELEMENTS, CLASS, updateScroll } from './ui_components.js'
import { convertTime } from './utils.js'

const handleContentLoaded = async () => {
  await repeatRequest()
}
const repeatRequest = async () => {
  const data = await getHistoryChat()
  await data.map((messages) => renderChatHistory(messages))
}

const renderChatHistory = (massages) => {
  const data = {
    user: massages.user.name,
    text: massages.text,
    time: massages.createdAt,
  }
  createOnlyUsersMassage(data)
  updateScroll()
}

const createMainUserMassage = (text) => {
  if (text.trim() !== '') {
    const message = UI_ELEMENTS.MESSAGE_MAIN.content.cloneNode(true)
    message.querySelector(CLASS.MESSAGE_TEXT).textContent = text
    message.querySelector(CLASS.MESSAGE_DATE).textContent = convertTime()
    UI_ELEMENTS.WINDOW_CHAT.append(message)
  }
}

const createOnlyUsersMassage = ({ user, text, time }) => {
  const message = UI_ELEMENTS.MESSAGE_ONLY.content.cloneNode(true)
  message.querySelector(CLASS.MESSAGE_ONLY).textContent = user
  message.querySelector(CLASS.MESSAGE_TEXT).textContent = text
  message.querySelector(CLASS.MESSAGE_DATE).textContent = convertTime(time)
  UI_ELEMENTS.WINDOW_CHAT.append(message)
}

export {
  handleContentLoaded,
  renderChatHistory,
  createMainUserMassage,
  createOnlyUsersMassage,
}
