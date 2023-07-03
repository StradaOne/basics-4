import Cookies from 'js-cookie';
import VARIABLES from './assets/varibles.mjs';
import { currentTime, scrollChat, createChatElement } from './assets/utilites.mjs';
import { checkSender } from './assets/validation.mjs';
import {
  sendAuthCode, getUserInfo, changeName, loadChatData,
} from './assets/fetch.mjs';

async function chatHistory() {
  const data = await loadChatData();
  const chatNodes = data.map((message) => createChatElement(message));
  console.log(chatNodes);
  VARIABLES.ELEMENTS.MESSAGES_NODE.append(...chatNodes);
}

function newMessage() {
  // Добавиь проверку на пустое сообщение
  const item = VARIABLES.ELEMENTS.TEMPLATE.content.cloneNode(true);
  const message = VARIABLES.ELEMENTS.CHAT_INPUT.value;
  item.querySelector('.chat__message').classList.add('chat__message__me');
  item.querySelector('.chat__message__text').classList.add('chat__message__text__me');
  item.querySelector('.chat_message__avatar__img').src = './user-avatar.jpg';
  item.querySelector('.chat__message__username').textContent = Cookies.get('username');
  item.querySelector('.chat__message__text').textContent = message;
  item.querySelector('.chat__message__time').textContent = currentTime();
  VARIABLES.ELEMENTS.MESSAGES_NODE.prepend(item);
}

async function render() {
  await chatHistory();
  scrollChat();
}

VARIABLES.ELEMENTS.AUTH.FORM.addEventListener('submit', (evt) => {
  evt.preventDefault();
  sendAuthCode();
});

VARIABLES.ELEMENTS.FORM.addEventListener('submit', (evt) => {
  evt.preventDefault();
  newMessage();
  VARIABLES.ELEMENTS.FORM.reset();
  scrollChat();
});

VARIABLES.ELEMENTS.SETTING.OPEN.addEventListener('click', (evt) => {
  evt.preventDefault();
  VARIABLES.ELEMENTS.SETTING.NODE.showModal();
});

VARIABLES.ELEMENTS.SETTING.CLOSE.addEventListener('click', () => {
  VARIABLES.ELEMENTS.SETTING.NODE.close();
});
VARIABLES.ELEMENTS.AUTH.VERIFICATION.FORM.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const token = VARIABLES.ELEMENTS.AUTH.VERIFICATION.INPUT.value;
  Cookies.set('token', token);
  VARIABLES.ELEMENTS.AUTH.NODE.close();
});
VARIABLES.ELEMENTS.SETTING.FORM.addEventListener('submit', (evt) => {
  evt.preventDefault();
  changeName();
  getUserInfo();
  VARIABLES.ELEMENTS.SETTING.NODE.close();
});

render();
