const fastDOM = (s) => document.querySelector(s);

const form = fastDOM("#form");
const input = fastDOM("#massage");
const place = fastDOM("#place");
const chat = fastDOM("#chat-body");
const register = fastDOM("#register-body");
const confirm = fastDOM("#confirmation-body");
const settings = fastDOM("#settings-body");
const buttonLogOut = fastDOM("#button-logout");
const inputEmail = fastDOM("#inputEmail");
const buttonNext = fastDOM("#buttonNext");
const crossback = fastDOM("#cross-back");
const buttonGo = fastDOM("#buttonGo");
const inputCode = fastDOM("#inputCode");
const buttonsettings = fastDOM("#button-settings");
const changeName = fastDOM("#changeName");
const inputName = fastDOM("#inputName");
const cross = fastDOM("#cross");

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
  buttonGo,
  inputCode,
  buttonsettings,
  cross,
  inputName,
  changeName,
};
