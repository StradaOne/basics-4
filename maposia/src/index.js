import Cookies from 'js-cookie';
import { VARIABLES } from './assets/varibles.mjs';
import { scrollChat, createChatElement } from './assets/utilites.mjs';
import {
  loadChatData,
} from './assets/fetch.mjs';

import { setupWebSocket } from './assets/websocket.mjs';
import {
  changeNameHandler,
  checkTokenHandler,
  closeSettingModal,
  getCodeEmail,
  openSettingModal,
  sendMessageHandler,
} from './assets/handlers.mjs';

async function chatHistory() {
  const data = await loadChatData();
  const chatNodes = data.map((message) => createChatElement(message));
  VARIABLES.ELEMENTS.MESSAGES_NODE.append(...chatNodes);
}

export async function render() {
  if (Cookies.get('token')) {
    await chatHistory();
    scrollChat();
  } else {
    VARIABLES.ELEMENTS.AUTH.NODE.showModal();
  }
}

VARIABLES.ELEMENTS.AUTH.FORM.addEventListener('submit', getCodeEmail);
VARIABLES.ELEMENTS.SUBMIT.addEventListener('submit', sendMessageHandler);
VARIABLES.ELEMENTS.SETTING.OPEN.addEventListener('click', openSettingModal);
VARIABLES.ELEMENTS.SETTING.CLOSE.addEventListener('click', closeSettingModal);
VARIABLES.ELEMENTS.AUTH.VERIFICATION.FORM.addEventListener('submit', checkTokenHandler);
VARIABLES.ELEMENTS.SETTING.FORM.addEventListener('submit', changeNameHandler);

render();
