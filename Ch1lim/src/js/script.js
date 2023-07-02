import { uiVariables } from './variables.js';
import { addUiMessageUser } from './addMessages.js';
import { postEmail } from './postEmail.js';

const {
  formMessage,
  formEmail,
  entryMessage,
  entryEmail,
} = uiVariables;

function isEmpty(str) {
  if (str.trim() === '') { return true; }

  return false;
}

function sendForm(e) {
  e.preventDefault();
  console.log(this.uiEl.value);
  if (isEmpty(this.uiEl.value)) return;
  const value = this.uiEl.value;
  e.target.reset();
  this.nextFunc(value);
}

formMessage.addEventListener('submit', {
  handleEvent: sendForm,
  uiEl: entryMessage,
  nextFunc: addUiMessageUser,
});
formEmail.addEventListener('submit', {
  handleEvent: sendForm,
  uiEl: entryEmail,
  nextFunc: postEmail,
});
