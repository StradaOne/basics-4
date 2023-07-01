import { uiVariables } from './variables.js';
import { addUiMessageUser } from './addMessages.js';

const {
  formMessage,
  entryMessage,
} = uiVariables;

function isEmpty(str) {
  if (str.trim() === '') { return true; }

  return false;
}

function sendFormMessage(e) {
  e.preventDefault();
  if (isEmpty(entryMessage.value)) return;
  const message = entryMessage.value;
  e.target.reset();
  addUiMessageUser(message);
}

formMessage.addEventListener('submit', sendFormMessage);
