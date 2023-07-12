import { setupWebSocket, socket } from "./websocket.mjs";
import { BLOCKS, VARIABLES } from "./varibles.mjs";
import { createChatElement, scrollChat, chatHeight } from "./utilites.mjs";
import { authorization, postAuthCode, setUserData } from "./fetch.mjs";
import { chatHistoryData, render } from "../index.js";
import { isCorrectEmail } from "./validation.mjs";
import Cookies from "js-cookie";


export function sendMessageHandler(event) {
  event.preventDefault()
  const message = VARIABLES.ELEMENTS.CHAT_INPUT.value
  socket.send(JSON.stringify({text: message}))
  VARIABLES.ELEMENTS.SUBMIT.reset()
}

export function newMessageHandler(evt) {
  let data
  try {
    data = JSON.parse(evt.data)
  } catch (error) {
    console.log(error)
  }
  const item = createChatElement(data)
  VARIABLES.ELEMENTS.MESSAGES_NODE.append(item);
  scrollChat()
}

export async function changeNameHandler(evt) {
  evt.preventDefault()
  await setUserData()
  socket.close()
  socket = setupWebSocket()
  VARIABLES.ELEMENTS.SETTING.NODE.close();
}

export async function checkTokenHandler(evt) {
  evt.preventDefault()
  const token = VARIABLES.ELEMENTS.AUTH.VERIFICATION.INPUT.value;
  const spinner = document.createElement('span')
  spinner.classList.add('loader');
  BLOCKS.VERIFICATION.classList.add('hide')
  VARIABLES.ELEMENTS.AUTH.FORMS_NODE.classList.add('spinner_center')
  VARIABLES.ELEMENTS.AUTH.FORMS_NODE.appendChild(spinner)
  try {
    const response = await authorization(token);
    if (response.ok) {
      const socket = setupWebSocket();
      VARIABLES.ELEMENTS.APP.classList.remove('hide')
      VARIABLES.ELEMENTS.AUTH.NODE.close();
      await render()
    }
  } catch (error) {
    BLOCKS.VERIFICATION.classList.remove('hide')
    console.error('Ошибка авторизации, не верный токен');
  }
  VARIABLES.ELEMENTS.AUTH.FORMS_NODE.classList.remove('spinner_center')
  document.querySelector('.loader').remove()
}

export function openSettingModal(evt) {
  evt.preventDefault();
  VARIABLES.ELEMENTS.SETTING.NODE.showModal();
  VARIABLES.ELEMENTS.SETTING.INPUT.value = Cookies.get('name')
}

export function closeSettingModal() {
  VARIABLES.ELEMENTS.SETTING.NODE.close();
}

export function requestToken(evt) {
  evt.preventDefault()
  const email = VARIABLES.ELEMENTS.AUTH.INPUT.value
  if (isCorrectEmail(email)) {
    const spinner = document.createElement('span')
    spinner.classList.add('loader');
    BLOCKS.AUTH.classList.add('hide')
    VARIABLES.ELEMENTS.AUTH.FORMS_NODE.classList.add('spinner_center')
    VARIABLES.ELEMENTS.AUTH.FORMS_NODE.appendChild(spinner)
    postAuthCode(email)
  }
}

export function loadMoreMessage() {
  const chatWindow = VARIABLES.ELEMENTS.MESSAGES_NODE
  const currentScroll = chatWindow.scrollTop
  const previousMaxHeight = chatWindow.scrollHeight
  if (currentScroll === 0) {
    const newMessage = chatHistoryData.slice(0, 20)
    const newMessagesReverse = newMessage.reverse();
    const chatNodes = newMessagesReverse.map((message) => createChatElement(message));
    VARIABLES.ELEMENTS.MESSAGES_NODE.prepend(...chatNodes);
    const maxHeight = chatWindow.scrollHeight
    chatHistoryData.splice(0, 20)
    chatWindow.scrollTo(0, (maxHeight - previousMaxHeight))
  }


}