import { ELEMENTS } from './ui.mjs';

function addMessageToDOM(sender) {
  if (sender === 'me') {
    ELEMENTS.EXTRA.MSG_TEMPLATE.content.querySelector('.message__text').textContent = ELEMENTS.SEND.INPUT.value.trim();
    ELEMENTS.EXTRA.MSG_TEMPLATE.content.querySelector('.message').setAttribute('id', 'message__sender')
    ELEMENTS.CHAT.append(ELEMENTS.EXTRA.MSG_TEMPLATE.content.cloneNode(true));
  } else {
    ELEMENTS.EXTRA.MSG_TEMPLATE.content.querySelector('.message__text').textContent = ELEMENTS.SEND.INPUT.value.trim();
    ELEMENTS.EXTRA.MSG_TEMPLATE.content.querySelector('.message').setAttribute('id', 'message__recipient')
    ELEMENTS.CHAT.append(ELEMENTS.EXTRA.MSG_TEMPLATE.content.cloneNode(true));
  }
};

function sendMessage(e, sender) {
  e.preventDefault();
  if (ELEMENTS.SEND.INPUT.value.trim() === '') return;
  addMessageToDOM(sender);
  ELEMENTS.SEND.INPUT.value = '';
}

ELEMENTS.SEND.FORM.addEventListener('submit', (e) => sendMessage(e, 'me'));
ELEMENTS.SEND.BTN.addEventListener('click', (e) => sendMessage(e, 'me'));

async function sendRequest(e) {
  e.preventDefault();
  const response = await fetch("https://edu.strada.one/api/user ", {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ email: ELEMENTS.EXTRA.AUTHORIZATION_INPUT.value })
  })
  if (response.status === 200) {
    console.log(response);
    window.authorizationModal.close();
    window.confirmModal.showModal();
  }
};

ELEMENTS.EXTRA.AUTHORIZATION_FORM.addEventListener('submit', (e) => sendRequest(e));
ELEMENTS.EXTRA.AUTHORIZATION_BTN.addEventListener('submit', (e) => sendRequest(e));