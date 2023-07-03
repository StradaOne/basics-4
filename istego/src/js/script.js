import {
    UI,
    UI_MODAL,
    ICONS,
    TEMPLATE,
    MODAL_TITLE,
    tempContainer,
    textarea,
} from './modules/variables.mjs';
import { setCookie, getCookie, removeCkookie } from './modules/ckookie.mjs';
import {
    URL,
    getToken,
    confirmationAuthorization,
    renameNickname,
} from './modules/api.mjs';

chekAuthorization();

// Данные из поля чата в скрытое поле
UI.enterFieldChat.addEventListener('input', () => {
    changeIconBtnChat(UI.enterFieldChat);
    textarea.value = getValueEnterChatField(UI.enterFieldChat);
});

//
UI.form.addEventListener('submit', sendingMessage);

document.addEventListener('keydown', (event) => {
    if (event.code === 'Enter' && !event.ctrlKey && !event.shiftKey) {
        sendingMessage(event);
    }
});

// ======================ПОЛУЧЕНИЕ ТОКЕНА========================
// ==============================================================

// Обработка поля ввода в модалке
UI_MODAL.enterFieldModal.addEventListener('input', actionInputAuthorization);

// Обработка клика ПОЛУЧИТЬ КОД
UI_MODAL.btnGiveCode.addEventListener('click', getCode);

// Обработка кнопки Войти
UI_MODAL.btnSingIn.addEventListener('click', authorization);

// Обработка кнопки Выйти
UI.btnSignOut.addEventListener('click', leaveTheChat);

// =============================================================
// =============================================================

// Получить подтверждение авторизации
function authorization() {
    if (isEmptyInputValue(UI_MODAL.enterFieldModal)) return;

    setCookie('token', `${getValueInput(UI_MODAL.enterFieldModal)}`);
    confirmationAuthorization(URL.urlDataProfile)
        .then((answer) => {
            if (answer.status === 'true') {
                clearInputField(UI_MODAL.enterFieldModal);
                activeDisableBtn(UI_MODAL.btnSingIn, 'disabled');
                // hideModal('none');
                chekAuthorization();
                UI_MODAL.enterFieldModal.removeEventListener(
                    'input',
                    actionInputConfirmation
                );
                console.log(answer);
                renderNicknameProfile(answer.answer.name);
            } else if (answer.status === 'false') {
                return;
            }
        })
        .catch((error) => {
            console.log(`Error: ${error.message}`);
        });
}

// Получить код
function getCode() {
    if (isEmptyInputValue(UI_MODAL.enterFieldModal)) {
        return;
    }
    getToken(URL.urlToken, getValueInput(UI_MODAL.enterFieldModal))
        .then((answer) => {
            if (answer.status === 'true') {
                clearInputField(UI_MODAL.enterFieldModal);
                activeDisableBtn(UI_MODAL.btnGiveCode, 'disabled');
                activeDisableBtn(UI_MODAL.btnEnterCode, 'active');
                // Обработка кнопки ввести код
                UI_MODAL.btnEnterCode.addEventListener(
                    'click',
                    actionBtnEnterCode
                );
            } else if (answer.status === 'false') {
                activeDisableBtn(UI_MODAL.btnGiveCode, 'disabled');
            }
        })
        .catch((error) => {
            console.log(`Error: ${error.message}`);
        });
}

// Смена имени
function rename() {
    if (isEmptyInputValue(UI_MODAL.enterFieldModal)) return;
    renameNickname(URL.urlToken, getValueInput(UI_MODAL.enterFieldModal));
    clearInputField(UI_MODAL.enterFieldModal);
    changeIconBtnRename();
}

//Проверка на авторизацию при запуске приложения
function chekAuthorization() {
    if (getCookie('token')) {
        hideModal();
        UI_MODAL.modal.addEventListener('click', modalDelegationClick);
        renderModal(
            MODAL_TITLE.settings.title,
            MODAL_TITLE.settings.inputTitle,
            MODAL_TITLE.settings.placeholder
        );
        showHideBtn(UI_MODAL.btnGiveCode, 'hide');
        showHideBtn(UI_MODAL.btnEnterCode, 'hide');
        showHideBtn(UI_MODAL.btnSingIn, 'hide');
        showHideBtn(UI_MODAL.btnRename, 'show');
        // Обработка поля input в смене имени
        UI_MODAL.enterFieldModal.addEventListener('input', actionInputRename);
        // Обработка кнопки сменить имя
        UI_MODAL.btnRename.addEventListener('click', rename);
    } else {
        renderModal(
            MODAL_TITLE.authorization.title,
            MODAL_TITLE.authorization.inputTitle,
            MODAL_TITLE.authorization.placeholder
        );
        showModal();
        UI_MODAL.modal.removeEventListener('click', modalDelegationClick);
        UI_MODAL.enterFieldModal.removeEventListener(
            'input',
            actionInputRename
        );
        showHideBtn(UI_MODAL.btnRename, 'hide');
    }
}

// Действия при вводе в input авторизации
function actionInputAuthorization() {
    const valueField = getValueInput(UI_MODAL.enterFieldModal);

    if (validateEmail(valueField)) {
        activeDisableBtn(UI_MODAL.btnGiveCode, 'active');
    } else {
        activeDisableBtn(UI_MODAL.btnGiveCode, 'disabled');
    }
}

// Действия при вводе в input подтверждения
function actionInputConfirmation() {
    if (isEmptyInputValue(UI_MODAL.enterFieldModal)) {
        activeDisableBtn(UI_MODAL.btnSingIn, 'disabled');
        return;
    } else {
        activeDisableBtn(UI_MODAL.btnSingIn, 'active');
    }
}

// Действия при вводе в input авторизации
function actionInputRename() {
    changeIconBtnRename();
}

// Действие по кнопке ввести код
function actionBtnEnterCode() {
    // if (isEmptyInputValue(UI_MODAL.enterFieldModal)) return;
    clearInputField(UI_MODAL.enterFieldModal);
    UI_MODAL.enterFieldModal.removeEventListener(
        'input',
        actionInputAuthorization
    );
    UI_MODAL.enterFieldModal.addEventListener('input', actionInputConfirmation);

    renderModal(
        MODAL_TITLE.confirmation.title,
        MODAL_TITLE.confirmation.inputTitle,
        MODAL_TITLE.confirmation.placeholder
    );

    showHideBtn(UI_MODAL.btnGiveCode, 'hide');
    showHideBtn(UI_MODAL.btnEnterCode, 'hide');
    activeDisableBtn(UI_MODAL.btnEnterCode, 'disabled');
    showHideBtn(UI_MODAL.btnSingIn, 'show');
    UI_MODAL.btnEnterCode.removeEventListener('click', actionBtnEnterCode);
}

// ПОКАЗАТЬ/СКРЫТЬ КНОПКУ
function showHideBtn(btn, action) {
    if (action === 'hide') btn.classList.add('hide-btn');
    if (action === 'show') btn.classList.remove('hide-btn');
}

// Рендер модального окна
function renderModal(titleModal, titleInput, placeholder) {
    UI_MODAL.titleModal.textContent = titleModal;
    UI_MODAL.enterFieldModal.placeholder = placeholder;
    UI_MODAL.titleInputModal.textContent = titleInput;
}
// Выход из чата
function leaveTheChat() {
    removeCkookie('token');
    chekAuthorization();
    renderModal(
        MODAL_TITLE.authorization.title,
        MODAL_TITLE.authorization.inputTitle,
        MODAL_TITLE.authorization.placeholder
    );
    showHideBtn(UI_MODAL.btnGiveCode, 'show');
    showHideBtn(UI_MODAL.btnEnterCode, 'show');
    showHideBtn(UI_MODAL.btnSingIn, 'hide');
}

// Отправка сообщения
function sendingMessage(event) {
    event.preventDefault();
    if (isEmptyEnterField(UI.enterFieldChat)) {
        return;
    } else {
        addMessage(getValueMessageForm(), '12:00', 'sent-message');
        clearEnterChatField();
        changeIconBtnChat(UI.enterFieldChat);
    }
}

// Показать/Скрыть preload
function showHidePreload(display) {
    UI.preload.style.display = display;
}

function renderNicknameProfile(nickname) {
    UI.nickname.textContent = nickname;
}

// Активировать или диактивировать кнопку
function activeDisableBtn(btn, action) {
    if (action === 'active') {
        btn.classList.add('active-btn');
        btn.disabled = '';
    } else if (action === 'disabled') {
        btn.classList.remove('active-btn');
        btn.disabled = 'false';
    }
}

// Проверка поля на ссылки
function containsLinks(text) {
    const pattern = /(http:|https:)([^\s]+)/gi;
    return pattern.test(text);
}

// Проверка корректности email
function validateEmail(email) {
    const pattern = /\S+@\S+\.\S+/;
    return pattern.test(email);
}

// Данные(текст сообщения) из формы
function getValueMessageForm() {
    const formData = new FormData(UI.form);
    return formData.get('message');
}

// Очистка поля ввода в чате
function clearEnterChatField() {
    UI.enterFieldChat.textContent = '';
}

// Очистка поля ввода input
function clearInputField(input) {
    input.value = '';
}

// Текст поля ввода
function getValueEnterChatField(field) {
    const valueEnterField = field.textContent.trim();

    return valueEnterField;
}

// Проверка поля ввода в чате на пустоту
function isEmptyEnterField(field) {
    const valueEnterField = getValueEnterChatField(field);

    if (valueEnterField === '') return true;
    if (valueEnterField) return false;
}

// Получение значения из input
function getValueInput(input) {
    const valueFiled = input.value.trim();

    return valueFiled;
}

// Проверка поля ввода input на пустоту
function isEmptyInputValue(field) {
    const valueField = getValueInput(field);

    if (valueField === '') return true;
    if (valueField) return false;
}

// Смена иконки кнопки отправки
function changeIconBtnChat(field) {
    if (isEmptyEnterField(field)) {
        disableBtn(UI.btnSend, true);

        UI.btnSend.style.backgroundImage = ICONS.srcBtnDisabled;
    } else {
        disableBtn(UI.btnSend, false);

        UI.btnSend.style.backgroundImage = ICONS.srcBtnActive;
    }
}

// Смена иконки кнопки в форме переименования ника
function changeIconBtnRename() {
    if (isEmptyInputValue(UI_MODAL.enterFieldModal)) {
        disableBtn(UI_MODAL.btnRename, true);

        UI_MODAL.btnRename.style.backgroundImage = ICONS.srcBtnRenameDisabled;
    } else {
        disableBtn(UI_MODAL.btnRename, false);

        UI_MODAL.btnRename.style.backgroundImage = ICONS.srcBtnRenameActive;
    }
}

// Диактивация кнопки
function disableBtn(btn, btnStatus) {
    btn.disabled = btnStatus;
}

// Добавление сообщения
function addMessage(textMessage, time, classMessage) {
    TEMPLATE.messageTextTemlate.textContent = textMessage;
    TEMPLATE.messageTimeTemplate.textContent = time;

    let message = tempContainer.content.cloneNode(true);

    const massageContainerTemp = message.querySelector('.chat-dialog__message');
    massageContainerTemp.classList.add(classMessage);

    UI.dialogWindow.append(message);
}

// ===================Модальное окно=====================
// ======================================================

UI.btnSettings.addEventListener('click', showModal);

// Делегирование модалки
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
// ======================================================
// ======================================================

// Разделить по модулям
// Локалсторедж
// Добавление сообщений из локалсторедж
// функцию рендер
// обработка ctrl + enter и shift + enter для переноса строки.
// Функцию для получения времени
// Объект с переменными для классов входящее/исходящее сообщение
