import {
  UI_ELEMENTS,
  MESSAGE,
  AUTH,
  CONFIRM,
  showSuccessAuth,
  SETTINGS,
  showUserInSettings,
  srcollToBottom,
} from './js/ui';
import { ValidationError, showError } from './js/errors';
import { getCookie, setCookie } from './js/cookies';

function validateIsAuthor(email) {
  if (email === 'sysoev.dev@gmail.com') {
    return true;
  }
  return false;
}

const socket = new WebSocket(`wss://edu.strada.one/websockets?${getCookie()}`);
console.log(socket);

socket.onmessage = (event) => {
  try {
    const data = JSON.parse(event.data);
    console.log(data);
    const isAuthor = validateIsAuthor(data.user.email);
    createMessage(data.user.name, data.text, data.createdAt, isAuthor);
  } catch (error) {
    showError(error);
  }
};

async function getAuthCode(email) {
  const url = 'https://edu.strada.one/api/user';
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ email }),
    });
    if (response.ok) {
      showSuccessAuth();
    } else {
      throw new ValidationError('Ошибка какая-то!');
    }
  } catch (error) {
    showError(error);
  }
}

async function changeUserName(newName) {
  const url = 'https://edu.strada.one/api/user';
  try {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${getCookie()}`,
      },
      body: JSON.stringify({ name: newName }),
    });
    if (response.ok) {
      const json = await response.json();
      console.log(`Имя изменено на ${json.name}`);
    } else {
      throw new ValidationError(await response.json().message);
    }
  } catch (error) {
    if (error instanceof ValidationError) {
      showError('Ошибка валидации');
    }
  }
}

async function getUser() {
  const url = 'https://edu.strada.one/api/user/me';
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${getCookie()}`,
      },
    });
    const json = await response.json();
    showUserInSettings(json.name, json.email);
    return json;
  } catch (error) {
    showError(error);
  }
}

function settingsFormHandler(event) {
  event.preventDefault();
  const newName = SETTINGS.INPUT.value;
  changeUserName(newName);
  getUser();
  event.target.reset();
}

SETTINGS.FORM.addEventListener('submit', settingsFormHandler);

function authFormHandler(event) {
  event.preventDefault();
  const email = AUTH.INPUT.value;
  getAuthCode(email);
  event.target.reset();
}

AUTH.FORM.addEventListener('submit', authFormHandler);

function confirmFormHandler(event) {
  event.preventDefault();
  const token = CONFIRM.INPUT.value;
  setCookie(token);
  event.target.reset();
}

CONFIRM.FORM.addEventListener('submit', confirmFormHandler);

function showMessage(item) {
  MESSAGE.LIST.append(item);
  srcollToBottom();
}

function convertTime(date) {
  return date.slice(11, 16);
}

function createMessage(author, text, time, isAuthor) {
  const item = document.createElement('li');
  item.classList.add('chat__message');
  if (isAuthor) {
    item.classList.add('chat__message-author');
  }
  item.append(MESSAGE.TEMPLATE.content.cloneNode(true));
  const messageAuthor = item.querySelector('.chat__message-author');
  const messageText = item.querySelector('.chat__message-text');
  const messageTime = item.querySelector('.chat__message-time');
  messageAuthor.textContent = author;
  messageText.textContent = text;
  messageTime.textContent = convertTime(time);
  showMessage(item);
}

async function getMessages() {
  const url = 'https://edu.strada.one/api/messages/';
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${getCookie()}`,
      },
    });
    const messages = await response.json();
    messages.messages.reverse().forEach((item) => {
      const isAuthor = validateIsAuthor(item.user.email);
      createMessage(item.user.name, item.text, item.createdAt, isAuthor);
    });
  } catch (error) {
    showError(error);
  }
}

function validateMessageText(value) {
  if (value.trim().length === 0) {
    console.log('Пустой текст');
    return false;
  }
  return value.trim();
}

function sendMessageHandler(event) {
  event.preventDefault();
  const messageText = validateMessageText(MESSAGE.INPUT.value);
  if (!messageText) {
    return;
  }
  socket.send(JSON.stringify({ text: `${messageText}` }));
  srcollToBottom();
  event.target.reset();
}

SETTINGS.BTN_SETTINGS.addEventListener('click', () => {
  SETTINGS.SETTINGS_MODAL.showModal();
  getUser();
});

AUTH.BTN_OPEN.addEventListener('click', () => {
  AUTH.MODAL.showModal();
});

CONFIRM.BTN_OPEN.addEventListener('click', () => {
  CONFIRM.MODAL.showModal();
});

UI_ELEMENTS.BTN_CLOSE_DIALOG.forEach((item) => {
  item.addEventListener('click', () => {
    UI_ELEMENTS.DIALOGS.forEach((itemModal) => {
      itemModal.close();
    });
  });
});

MESSAGE.FORM.addEventListener('submit', sendMessageHandler);

getMessages();
