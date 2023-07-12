import Cookies from 'js-cookie';
import { VARIABLES } from './assets/varibles.mjs';
import { scrollChat, createChatElement } from './assets/utilites.mjs';
import {
  getChatData,
} from './assets/fetch.mjs';

import { setupWebSocket } from './assets/websocket.mjs';
import {
  changeNameHandler,
  checkTokenHandler,
  closeSettingModal,
  requestToken,
  openSettingModal,
  sendMessageHandler,
  loadMoreMessage,
} from './assets/handlers.mjs';

export let chatHistoryData = [];

const chatWindow = VARIABLES.ELEMENTS.MESSAGES_NODE;
const maxHeight = chatWindow.scrollHeight;
console.log(maxHeight);

async function chatHistory() {
  const data = await getChatData();
  chatHistoryData = data.messages;
  const newMessages = chatHistoryData.slice(0, 20);
  const newMessagesReverse = newMessages.reverse();
  const chatNodes = newMessagesReverse.map((message) => createChatElement(message));
  chatHistoryData.splice(0, 20);
  VARIABLES.ELEMENTS.MESSAGES_NODE.append(...chatNodes);
}

export async function render() {
  if (Cookies.get('token')) {
    const socket = setupWebSocket();
    await chatHistory();
    VARIABLES.ELEMENTS.MAIN_USERNAME.textContent = Cookies.get('name');
    document.querySelector('.chat__wrapper').classList.remove('hide');
    scrollChat();
    VARIABLES.ELEMENTS.CHAT_INPUT.focus();
  } else {
    VARIABLES.ELEMENTS.AUTH.NODE.showModal();
  }
}

VARIABLES.ELEMENTS.AUTH.FORM.addEventListener('submit', requestToken);
VARIABLES.ELEMENTS.SUBMIT.addEventListener('submit', sendMessageHandler);
VARIABLES.ELEMENTS.SETTING.OPEN.addEventListener('click', openSettingModal);
VARIABLES.ELEMENTS.SETTING.CLOSE.addEventListener('click', closeSettingModal);
VARIABLES.ELEMENTS.AUTH.VERIFICATION.FORM.addEventListener('submit', checkTokenHandler);
VARIABLES.ELEMENTS.SETTING.FORM.addEventListener('submit', changeNameHandler);
VARIABLES.ELEMENTS.MESSAGES_NODE.addEventListener('scroll', loadMoreMessage);
document.querySelector('.chat__setting__theme__input').addEventListener('change', function () {
  if (this.checked) {
    VARIABLES.ELEMENTS.SETTING.THEME_NAME.textContent = 'Светлая тема';
    document.querySelector('body').classList.remove('dark');
  } else {
    VARIABLES.ELEMENTS.SETTING.THEME_NAME.textContent = 'Тёмная тема';
    document.querySelector('body').classList.add('dark');
  }
});

render();

window.addEventListener('DOMContentLoaded', () => {
  const preloader = document.querySelector('.preloader');
  setTimeout(() => {
    // document.querySelector('.chat__wrapper').classList.remove('hide');
    preloader.classList.add('preloader_hidden');
  }, 1000);
});
