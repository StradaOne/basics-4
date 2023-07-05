import { UI_MODAL } from "./variables.mjs";

// Делегирование модалки нажатие на КРЕСТИК/ПУСТОЕ ПРОСТРАНСТВО
function modalDelegationClick(event) {
    if (
        event.target === UI_MODAL.btnModalClose ||
        event.target === UI_MODAL.modal
    ) {
        hideModal();
    }
}

function showModal() {
    UI_MODAL.modal.classList.add('show-modal');
}

function hideModal() {
    UI_MODAL.modal.classList.remove('show-modal');
}

// Рендер модального окна
function renderModal(titleModal, titleInput, placeholder) {
    UI_MODAL.titleModal.textContent = titleModal;
    UI_MODAL.enterFieldModal.placeholder = placeholder;
    UI_MODAL.titleInputModal.textContent = titleInput;
}

export { modalDelegationClick, showModal, hideModal, renderModal, };
