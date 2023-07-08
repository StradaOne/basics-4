import VARIABLES from './assets/varibles.mjs';
import { currentTime, scrollChat } from './assets/utilites.mjs';
import checkSender from './assets/validation.mjs';

function newMessage() {
  // Добавиь проверку на пусто сообщение
  const item = VARIABLES.ELEMENTS.TEMPLATE.content.cloneNode(true);
  let message;
  if (checkSender()) {
    message = VARIABLES.ELEMENTS.CHAT_INPUT.value;
    item.querySelector('.chat__message').classList.add('chat__message__me');
    item.querySelector('.chat__message__text').classList.add('chat__message__text__me');
    item.querySelector('.chat_message__avatar__img').src = './user-avatar.jpg';
  } else {
    // сообщение с сервера
    message = 'test';
    item.querySelector('.chat__message').classList.add('chat__message__them');
    item.querySelector('.chat__message__text').classList.add('chat__message__text__them');
  }
  item.querySelector('.chat__message__text').textContent = message;
  item.querySelector('.chat__message__time').textContent = currentTime();
  VARIABLES.ELEMENTS.MESSAGES_NODE.appendChild(item);
}

VARIABLES.ELEMENTS.FORM.addEventListener('submit', (evt) => {
  evt.preventDefault();
  newMessage();
  VARIABLES.ELEMENTS.FORM.reset();
  scrollChat();
});

function render() {
  scrollChat();
}

render();
