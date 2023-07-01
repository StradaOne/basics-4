import { UI_ELEMENTS, MESSAGE } from './js/ui';

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

UI_ELEMENTS.BTN_CLOSE_DIALOG.addEventListener('click', () => {
  UI_ELEMENTS.SETTINGS_MODAL.close();
});

MESSAGE.FORM.addEventListener('submit', sendMessageHandler);
