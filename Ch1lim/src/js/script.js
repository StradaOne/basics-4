// eslint-disable-next-line import/no-extraneous-dependencies
import Cookies from 'js-cookie';
import { uiVariables } from './variables';
import { addUiMessageUser } from './addMessages';
import {
  postEmail,
  getVerif,
  patchName,
} from './httpRequest';

const {
  formMessage,
  formEmail,
  formCode,
  formName,
  entryMessage,
  entryEmail,
  entryCode,
  entryName,
  btnExit,
  btnEnterCode,
  btnSettings,
  btnCrossCode,
  btnCrossSettings,
  modAuthoriz,
  modCode,
  modSettings,
} = uiVariables;

function checkVerif() {
  if (Cookies.get('token') !== undefined) {
    modAuthoriz.classList.add('modal-none');
  }
}

function isEmpty(str) {
  if (str.trim() === '') { return true; }

  return false;
}

function sendForm(e) {
  e.preventDefault();
  if (isEmpty(this.uiEl.value)) return;
  const value = this.uiEl.value;
  e.target.reset();
  this.nextFunc(value);
}

async function saveTokenCookie(token) {
  const success = await getVerif(token);
  if (success) {
    Cookies.set('token', `${token}`);
    modCode.classList.add('modal-none');
    return;
  }
  alert('Не верный код');
}

function exit() {
  Cookies.remove('token');
  location.reload();
}

function changeName(name) {
  patchName(name);
  entryName.placeholder = 'Ch1lim';
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
formCode.addEventListener('submit', {
  handleEvent: sendForm,
  uiEl: entryCode,
  nextFunc: saveTokenCookie,
});
formName.addEventListener('submit', {
  handleEvent: sendForm,
  uiEl: entryName,
  nextFunc: changeName,
});

function changeModal() {
  this.elHide.classList.add('modal-none');
  this.elShow.classList.remove('modal-none');
}

btnEnterCode.addEventListener('click', {
  handleEvent: changeModal,
  elHide: modAuthoriz,
  elShow: modCode,
});
btnSettings.addEventListener('click', () => {
  modSettings.classList.remove('modal-none');
});
btnCrossCode.addEventListener('click', {
  handleEvent: changeModal,
  elHide: modCode,
  elShow: modAuthoriz,
});
btnCrossSettings.addEventListener('click', () => {
  modSettings.classList.add('modal-none');
});
btnExit.addEventListener('click', exit);

checkVerif();
