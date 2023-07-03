import {
  DOM_ELEMENTS, TAG_DIALOG
} from "./modules/constants.js";
import { convertTime } from "./modules/utils.js";
import {getCode,checkToken,changeName,getMessages} from "./modules/request.js"
import {COOKIES} from "./modules/cookies.js"
import Cookies from "js-cookie";

function checkUser(user) {
    return user === TAG_DIALOG.MODAL_INPUT_SET.value  ? DOM_ELEMENTS.MY_TEMPLATE : DOM_ELEMENTS.COMPANION_TEMPLATE
}

function renderMessage(value, date, nickname,template) {
  const item = template.content.cloneNode(true);
  item.querySelector(".chat-mainWindow-message-info-nickName").textContent = nickname;
  item.querySelector(".chat-mainWindow-message-info-text").textContent = value;
  item.querySelector(".chat-mainWindow-message-info-time").textContent = date;
  return DOM_ELEMENTS.MESSAGE_BLOCK.append(item);
}

//--------------------------------------Рендер сообзений после загрузки html-----------------------------------------------------------//
document.addEventListener('DOMContentLoaded', async() => {
  const data = await getMessages(COOKIES.GET('User-code'))
  const chatNodes = data.reverse().map((message) => renderMessage(message.text, convertTime(message.createdAt),message.user.name,checkUser(message.user.name)))
  return chatNodes
})


//--------------------------------------СОБЫТИЯ-----------------------------------------------------------//

//--------------------------------------Настройки-----------------------------------------------------------//

DOM_ELEMENTS.SETTINGS.addEventListener("click", () => {
  TAG_DIALOG.MODAL_WINDOW_SET.showModal();
});

TAG_DIALOG.MODAL_CLOSE_SET.addEventListener("click", () => {
  TAG_DIALOG.MODAL_WINDOW_SET.close();
});

TAG_DIALOG.MODAL_FORM_SET.addEventListener('submit', async (event) => {
  event.preventDefault()
  changeName(TAG_DIALOG.MODAL_INPUT_SET.value,COOKIES.GET('User-code')) // Придумать переменную
  TAG_DIALOG.MODAL_WINDOW_SET.close();
})

//--------------------------------------Отправка сообщения-----------------------------------------------------------//
DOM_ELEMENTS.FORM_SEND.addEventListener("submit", (event) => {
  event.preventDefault();
  renderMessage(DOM_ELEMENTS.INPUT_MESSAGE.value, convertTime(), TAG_DIALOG.MODAL_INPUT_SET.value,checkUser(TAG_DIALOG.MODAL_INPUT_SET.value));
  DOM_ELEMENTS.INPUT_MESSAGE.value = "";
});


//--------------------------------------Модальное окно авторизации-----------------------------------------------------------//
DOM_ELEMENTS.LOGOUT.addEventListener("click", () => {
  TAG_DIALOG.MODAL_WINDOW_AUT.showModal();
});

TAG_DIALOG.MODAL_CLOSE_AUT.addEventListener("click", () => {
  TAG_DIALOG.MODAL_WINDOW_AUT.close();
});

TAG_DIALOG.MODAL_ENTER_CODE.addEventListener("click", (event) => {
  event.preventDefault()
  getCode(TAG_DIALOG.MODAL_INPUT_AUT.value)
});

//--------------------------------------Модальное окно подтверждения-----------------------------------------------------------//

TAG_DIALOG.MODAL_GET_CODE.addEventListener("click", (event) => {
  event.preventDefault();
  TAG_DIALOG.MODAL_WINDOW_AUT.close();
  TAG_DIALOG.MODAL_WINDOW_VERIFY.showModal();
});

TAG_DIALOG.MODAL_CLOSE_VERIFY.addEventListener("click", () => {
  TAG_DIALOG.MODAL_WINDOW_VERIFY.close();
});

TAG_DIALOG.MODAL_LOGIN_VERIFY.addEventListener("click", async (event) => {
  event.preventDefault();
  const isSucces = await checkToken(TAG_DIALOG.MODAL_INPUT_VERIFY.value)
  if(isSucces) {
    COOKIES.SET(TAG_DIALOG.MODAL_INPUT_VERIFY.value),
    TAG_DIALOG.MODAL_WINDOW_VERIFY.close();
  }
})

















// DOM_ELEMENTS.FORM_SEND.addEventListener("submit", (event) => {
//   event.preventDefault();
//   renderMessage(checkUser(TAG_DIALOG.MODAL_INPUT_SET.value), DOM_ELEMENTS.INPUT_MESSAGE.value, convertTime(), TAG_DIALOG.MODAL_INPUT_SET.value);
//   DOM_ELEMENTS.INPUT_MESSAGE.value = "";
// });


// TAG_DIALOG.MODAL_FORM_SET.addEventListener("submit", (event) => {
//     event.preventDefault()
//     TAG_DIALOG.MODAL_WINDOW_SET.close();
//     return TAG_DIALOG.MODAL_INPUT_SET.value
//   });
