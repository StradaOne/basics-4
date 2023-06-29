import { UI_ELEMENTS } from './js/ui';
import { createModal } from './js/create';

function checkTypeBtnForm(target) {
  switch (target) {
    case UI_ELEMENTS.btnSettings:
      return 'settings';
    default:
      break;
  }
}

function modalShow(modal) {
  UI_ELEMENTS.chat.append(modal);
}

function modalShowHandler(event) {
  const typeForm = checkTypeBtnForm(event.target);
  const modal = createModal(typeForm);

  const btnClose = modal.querySelector('.modal__btn-close');
  btnClose.addEventListener('click', () => {
    modal.remove();
  });

  modalShow(modal);
}

function showMessage(item) {
  UI_ELEMENTS.MESSAGES.append(item)
}

function createMessage(author, text) {
  let isAuthor = false;

  if (!author) {
    isAuthor = true;
  }

  const item = document.createElement('div');
  item.classList.add('chat__content-message', 'message--right', 'message');
  item.append(UI_ELEMENTS.MESSAGE_TEMPLATE.content.cloneNode(true));
  const messageAuthor = item.querySelector('.message__content-author');
  const messageText = item.querySelector('.message__content-text');
  if (isAuthor) {
    messageAuthor.textContent = 'Я:';
  } else {
    messageAuthor.textContent = author;
  }
  
  
  messageText.textContent = text;


  
  return item;
}

function sendMessageHandler(event) {
  event.preventDefault();
  const messageText = UI_ELEMENTS.CHAT_MESSAGE_INPUT.value;
  const messageItem = createMessage(null, messageText)
  showMessage(messageItem)
  
  event.target.reset();
}

UI_ELEMENTS.CHAT_MESSAGE_FORM.addEventListener('submit', sendMessageHandler)
UI_ELEMENTS.btnSettings.addEventListener('click', modalShowHandler);
