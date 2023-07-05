import { convTime } from "./modules/convertationTime";
import { createNewMessage } from "./modules/createUiElement";
import { getCookie, setCookie } from "./modules/cookieAction";

import {
  postData,
  changeName,
  getData,
  getHistoryMessage,
} from "./modules/apiAction";

import {
  INPUT_NODE,
  BUTTON_OUT,
  BUTTON_AUTORIZATION,
  BUTTON_AUTHENTICATION,
  DISPLAY_NODE,
} from "./modules/DOMelements";

const ADD_NEW_MESSAGE_FORM = document.querySelector(".form");
const AUTHORIZATION_FORM = document.querySelector(".authorization-form__input");
const SETTING_FORM = document.querySelector(".popup-form__input");
//смена имени
const SETTING_MODAL_BUTTON = document.querySelector(".header__btn-settings");

// const AUTHENTICATION_FORM = document.querySelector('.authentication-form__input');

//COOKIE
const cookie = getCookie();
const cookieToken = cookie.token;
export { cookieToken };

export function inputClear() {
  INPUT_NODE.value = "";
}

function showInfoMessage() {
  const textElem = document.createElement("p");
  textElem.textContent = "Код отправлен на вашу почту ✅";
  const parentElem = document.querySelector(".authorization");
  textElem.classList.add("info-message");
  parentElem.append(textElem);
}

function showAuthenticationModal() {
  window.authentication.showModal();
  window.authorization.close();
}

export function scroll() {
  const div = document.querySelector(".display");
  const magicNumber = 200000;
  div.scrollBy(0, magicNumber);
}

//SOCKET
const socket = new WebSocket(`wss://edu.strada.one/websockets?${cookieToken}`);

console.log(socket);
socket.onmessage = (e) => {
  const data = JSON.parse(e.data);
  const mess = createNewMessage(
    data.user.name,
    data.text,
    convTime(data.createdAt)
  );
  DISPLAY_NODE.append(mess);
  scroll();
};

function handlerMessage(event) {
  event.preventDefault();
  socket.send(JSON.stringify({ text: INPUT_NODE.value }));
  console.log(INPUT_NODE.value);
  inputClear();
  scroll();
}

AUTHORIZATION_FORM.addEventListener("submit", () => {
  postData();
  showInfoMessage();
  setTimeout(showAuthenticationModal, 1500);
});

SETTING_MODAL_BUTTON.addEventListener("click", () => {
  window.myDialog.showModal();
});

BUTTON_AUTORIZATION.addEventListener("click", () => {
  window.authentication.showModal();
  window.authorization.close();
});

BUTTON_AUTHENTICATION.addEventListener("click", () => {
  getData(cookieToken);
  setCookie();
  // getHistoryMessage(cookieToken);
  window.authentication.close();
});

BUTTON_OUT.addEventListener("click", () => {
  window.authorization.showModal();
  document.cookie = `token=${new Date(0)}`;
  //сделать смену кнопки на "войти"
});

SETTING_FORM.addEventListener("submit", () => {
  changeName();
  window.myDialog.close();
});

// AUTHENTICATION_FORM.addEventListener('submit', () => {
//   getData(cookieToken);
//   getHistoryMessage(cookieToken);
//   window.
// })
ADD_NEW_MESSAGE_FORM.addEventListener("submit", handlerMessage);

window.addEventListener("DOMContentLoaded", () => {
  // getData(cookieToken);
  getHistoryMessage(cookieToken);
});
