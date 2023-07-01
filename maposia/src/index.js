import Cookies from 'js-cookie';
import VARIABLES from './assets/varibles.mjs';
import { currentTime, scrollChat } from './assets/utilites.mjs';
import iSender from './assets/validation.mjs';
import { sendAuthCode, getUserInfo, changeName } from './assets/fetch.mjs';

function newMessage() {
  // Добавиь проверку на пусто сообщение
  const item = VARIABLES.ELEMENTS.TEMPLATE.content.cloneNode(true);
  let message;
  if (iSender()) {
    message = VARIABLES.ELEMENTS.CHAT_INPUT.value;

    item.querySelector('.chat__message').classList.add('chat__message__me');
    item.querySelector('.chat__message__text').classList.add('chat__message__text__me');
    item.querySelector('.chat_message__avatar__img').src = './user-avatar.jpg';
  } else {
    // сообщение с сервера
    message = '';
    item.querySelector('.chat__message').classList.add('chat__message__them');
    item.querySelector('.chat__message__text').classList.add('chat__message__text__them');
  }
  item.querySelector('.chat__message__username').textContent = Cookies.get('username');
  item.querySelector('.chat__message__text').textContent = message;
  item.querySelector('.chat__message__time').textContent = currentTime();
  VARIABLES.ELEMENTS.MESSAGES_NODE.appendChild(item);
}

function render() {
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
  // document.querySelector('dialog').style.opacity = '0';
  // document.querySelector('dialog').removeAttribute('open');
  VARIABLES.ELEMENTS.SETTING.NODE.close();
});
VARIABLES.ELEMENTS.AUTH.CONFIRM.FORM.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const token = VARIABLES.ELEMENTS.AUTH.CONFIRM.INPUT.value;
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
