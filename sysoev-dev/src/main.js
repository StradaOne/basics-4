import { UI_ELEMENTS, MESSAGE, AUTH, CONFIRM, showSuccessAuth } from './js/ui';
import { ValidationError, showError } from './js/errors';

async function getAuthCode(email) {
  const url = 'https://edu.strada.one/api/user';
  let object = {
    email: email,
  };

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
      throw new ValidationError('Ошика какая-то!');
    }
  } catch (error) {
    showError(error);
  }
}

function authFormHandler() {
  event.preventDefault();
  const email = AUTH.INPUT.value;
  getAuthCode(email);
  event.target.reset();
}

AUTH.FORM.addEventListener('submit', authFormHandler);

function saveAuthCode(token) {
  console.log(token);
}

function confirmFormHandler(event) {
  event.preventDefault();
  const token = CONFIRM.INPUT.value;
  saveAuthCode(token);
  event.target.reset();
}

CONFIRM.FORM.addEventListener('submit', confirmFormHandler);
function showMessage(item) {
  MESSAGE.LIST.append(item);
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
  messageTime.textContent = time;
  return item;
}

function validateMessageText(value) {
  if (value.trim().length === 0) {
    console.log('Пустой текст');
    return;
  } else {
    return value.trim();
  }
}

function sendMessageHandler() {
  event.preventDefault();
  const messageText = validateMessageText(MESSAGE.INPUT.value);
  if (!messageText) {
    return;
  }
  const messageAuthor = 'Я';
  const messageTime = '10:33';
  const item = createMessage(messageAuthor, messageText, messageTime, true);
  showMessage(item);
  event.target.reset();
}

UI_ELEMENTS.BTN_SETTINGS.addEventListener('click', () => {
  UI_ELEMENTS.SETTINGS_MODAL.showModal();
});

AUTH.BTN_OPEN.addEventListener('click', () => {
  AUTH.MODAL.showModal();
});

CONFIRM.BTN_OPEN.addEventListener('click', () => {
  CONFIRM.MODAL.showModal();
});

UI_ELEMENTS.BTN_CLOSE_DIALOG.forEach((item) => {
  item.addEventListener('click', () => {
    UI_ELEMENTS.DIALOGS.forEach((item) => {
      item.close();
    });
  });
});

// UI_ELEMENTS.BTN_CLOSE_DIALOG.addEventListener('click', () => {
//   const dialogs = document.querySelectorAll('.dialog');
//   dialogs.forEach((item) => {
//     item.close();
//   });
//   UI_ELEMENTS.SETTINGS_MODAL.close();
// });

MESSAGE.FORM.addEventListener('submit', sendMessageHandler);
