import { format } from 'date-fns'
import { VARIABLES } from "./varibles.mjs";
import Cookies from "js-cookie";


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


function createChatElement(data) {
  const template = VARIABLES.ELEMENTS.TEMPLATE.content.cloneNode(true);
  if (data.user.email === Cookies.get('email')) {
    template.querySelector('.chat__message').classList.add('chat__message__me');
    template.querySelector('.chat__message__text').classList.add('chat__message__text__me');
    template.querySelector('.chat_message__avatar__img').src = './user-avatar.jpg';
  } else {
    template.querySelector('.chat__message').classList.add('chat__message__them');
    template.querySelector('.chat__message__text').classList.add('chat__message__text__them');
  }
  template.querySelector('.chat__message__username').textContent = data.user.name;
  template.querySelector('.chat__message__text').textContent = data.text;
  template.querySelector('.chat__message__time').textContent = currentTime(data.createdAt);

  return template
}


export { currentTime, scrollChat, createChatElement }
