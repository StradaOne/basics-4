import { convertTime } from './utils'
import { UI_ELEMENTS, updateScroll } from './ui'
import { CLASS } from './confing.js'
import { userMain } from './user.js'
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
    type: type,
  }
  renderMessage(data)
}

const renderMessage = ({ user, email, text, time, type }) => {
  const userRight = UI_ELEMENTS.MESSAGE_MAIN.content.cloneNode(true);
  const userLeft = UI_ELEMENTS.MESSAGE_ONLY.content.cloneNode(true);
  const userValidation = userMain.email;
  const message = userValidation === email ? userRight : userLeft;

  userRight.querySelector(CLASS.MESSAGE_MAIN).textContent = user;
  userLeft.querySelector(CLASS.MESSAGE_ONLY).textContent = user
  message.querySelector(CLASS.MESSAGE_TEXT).textContent = text;
  message.querySelector(CLASS.MESSAGE_DATE).textContent = convertTime(time);

  if (type === MESSAGE.UP) {
    UI_ELEMENTS.WINDOW_CHAT.append(message);
    updateScroll();
  }

  if (type === MESSAGE.DOWN) {
    UI_ELEMENTS.WINDOW_CHAT.prepend(message);
  }
}

export { renderSystemMessage, parseMessage }

