import { format } from 'date-fns'
import VARIABLES from "./varibles.mjs";


function currentTime(time = new Date()) {
  const defaultFormat = new Date(time)
  const formatTime = format(defaultFormat, 'dd.MM HH:mm')
  return formatTime
}

function scrollChat() {
  const chatWindow = VARIABLES.ELEMENTS.MESSAGES_NODE
  const maxHeight = chatWindow.scrollHeight;
  chatWindow.scrollTo(0, maxHeight);
}

function createChatElement(message) {
  const template = VARIABLES.ELEMENTS.TEMPLATE.content.cloneNode(true);
  template.querySelector('.chat__message').classList.add('chat__message__them');
  template.querySelector('.chat__message__text').classList.add('chat__message__text__them');
  template.querySelector('.chat__message__username').textContent = message.user.name;
  template.querySelector('.chat__message__text').textContent = message.text;
  template.querySelector('.chat__message__time').textContent = currentTime(message.createdAt);
  return template
}

export { currentTime, scrollChat, createChatElement }
