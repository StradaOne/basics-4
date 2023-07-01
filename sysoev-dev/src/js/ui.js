export const UI_ELEMENTS = {
  DIALOGS: document.querySelectorAll('.dialog'),
  BTN_SETTINGS: document.querySelector('.chat__top-btn-settings'),
  SETTINGS_MODAL: document.querySelector('.dialog-settings'),
  BTN_CLOSE_DIALOG: document.querySelectorAll('.dialog__top-btn'),
};

export const MESSAGE = {
  FORM: document.querySelector('.chat__bottom-form'),
  INPUT: document.querySelector('.chat__bottom-input'),
  TEMPLATE: document.querySelector('.message-template'),
  LIST: document.querySelector('.chat__messages'),
};

export const AUTH = {
  BTN_OPEN: document.querySelector('.chat__top-btn-login'),
  MODAL: document.querySelector('.dialog-auth'),
  FORM: document.querySelector('.form-auth'),
  INPUT: document.querySelector('.form-auth__input'),
  BTN_SUBMIT: document.querySelector('.form-auth__btn'),
};

export const CONFIRM = {
  BTN_OPEN: document.querySelector('.dialog__confirm-open'),
  MODAL: document.querySelector('.dialog-confirm'),
  FORM: document.querySelector('.form-confirm'),
  INPUT: document.querySelector('.form-confirm__input'),
};

export function showSuccessAuth() {
  AUTH.BTN_SUBMIT.classList.add('form-auth__btn--success');
  setTimeout(() => AUTH.BTN_SUBMIT.classList.remove('form-auth__btn--success'), 5000);
}
