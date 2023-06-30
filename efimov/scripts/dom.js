const fastDOM = (s) => document.querySelector(s);

const form = fastDOM("#form");
const input = fastDOM("#massage");
const place = fastDOM("#place");
const chat = fastDOM("#chat-body");
const register = fastDOM("#register-body");
const confirm = fastDOM("#confirmation-body");
const settings = fastDOM("#chat-body");
const buttonLogOut = fastDOM("#button-logout");
const inputEmail = fastDOM("#inputEmail");
const buttonNext = fastDOM("#buttonNext");
const crossback = fastDOM("#cross-back");

export default {
  form,
  input,
  place,
  chat,
  register,
  confirm,
  settings,
  buttonLogOut,
  inputEmail,
  buttonNext,
  crossback,
};
