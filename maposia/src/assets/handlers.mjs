import { setupWebSocket, socket } from "./websocket.mjs";
import { VARIABLES } from "./varibles.mjs";
import { createChatElement } from "./utilites.mjs";
import { authorization, getAuthCode, setUserData } from "./fetch.mjs";
import { render } from "../index.js";

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
  console.log(data)
  const item = createChatElement(data)
  VARIABLES.ELEMENTS.MESSAGES_NODE.prepend(item);
}

export async function changeNameHandler(evt) {
  evt.preventDefault()
  await setUserData()
  VARIABLES.ELEMENTS.SETTING.NODE.close();
}

export async function checkTokenHandler(evt) {
  evt.preventDefault()
  const token = VARIABLES.ELEMENTS.AUTH.VERIFICATION.INPUT.value;
  try {
    const response = await authorization(token);
    if (response.ok) {
      const socket = setupWebSocket();
      VARIABLES.ELEMENTS.AUTH.NODE.close();
      await render()
    }
  } catch (error) {
    console.error('Ошибка авторизации, не верный токен');
  }
}

export function openSettingModal(evt) {
  evt.preventDefault()
  VARIABLES.ELEMENTS.SETTING.NODE.showModal();
}

export function closeSettingModal() {
  VARIABLES.ELEMENTS.SETTING.NODE.close();
}

export function getCodeEmail(evt) {
  evt.preventDefault()
  getAuthCode()
}