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

UI_ELEMENTS.btnSettings.addEventListener('click', modalShowHandler);
