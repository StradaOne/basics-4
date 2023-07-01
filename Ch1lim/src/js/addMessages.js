import { uiVariables } from './variables.js';

const {
  dialogWindow,
  messageUser,
} = uiVariables;

export function addUiMessageUser(message) {
  const clone = messageUser.content.cloneNode(true);
  clone.querySelector('.messageU__text').innerHTML = `Я: ${message}`;
  dialogWindow.append(clone);
}
