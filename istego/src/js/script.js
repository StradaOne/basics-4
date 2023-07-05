import {
    UI,
    UI_MODAL,
    ICONS,
    TEMPLATE,
    MODAL_TITLE,
    CLASS,
    tempContainer,
    textarea,
    URL,
    API_METHOD,
} from './modules/variables.mjs';
import { setCookie, getCookie, removeCkookie } from './modules/ckookie.mjs';
import { getDataServer } from './modules/api.mjs';
import {
    modalDelegationClick,
    showModal,
    hideModal,
    renderModal,
} from './modules/modal-functions.mjs';
import {
    renderNicknameProfile,
    scrollBottomDialog,
    showHideBtn,
    validateEmail,
    activeDisableBtn,
    clearField,
    getValueField,
    isEmptyField,
    correctDate,
    changeIconBtn,
} from './modules/help-functions.mjs';
import 'emoji-picker-element';

chekAuthorization();

// Обработка клика ПОЛУЧИТЬ КОД
UI_MODAL.btnGiveCode.addEventListener('click', getCode);

// Обработка поля ввода в модалке
UI_MODAL.enterFieldModal.addEventListener('input', actionInputAuthorization);

// Обработка кнопки Войти
UI_MODAL.btnSingIn.addEventListener('click', enterCode);

// Обработка кнопки Выйти
UI.btnSignOut.addEventListener('click', leaveTheChat);

// Слушатель кнопки настройки
UI.btnSettings.addEventListener('click', showModal);

// Обработка поля ввода в чате
UI.enterFieldChat.addEventListener('input', () => {
    changeIconBtn(
        UI.enterFieldChat,
        UI.btnSend,
        ICONS.srcBtnActive,
        ICONS.srcBtnDisabled
    );
    textarea.value = getValueField(UI.enterFieldChat);
});

//Слушатель кнопки отправить сообщение
UI.form.addEventListener('submit', sendingMessage);

document.addEventListener('keydown', (event) => {
    if (event.code === 'Enter' && !event.ctrlKey && !event.shiftKey) {
        sendingMessage(event);
    }
});

// Обработка emodji
UI.emoji.addEventListener('emoji-click', (event) => {
        UI.enterFieldChat.textContent += event.detail.unicode;
        changeIconBtn(
            UI.enterFieldChat,
            UI.btnSend,
            ICONS.srcBtnActive,
            ICONS.srcBtnDisabled
        );
        textarea.value = getValueField(UI.enterFieldChat);
    });

// ==========================ФУНКЦИИ============================
// =============================================================

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
        UI_MODAL.btnRename.addEventListener('click', renameNickname);
        renderNicknameProfile(getCookie('nickname'));
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
        UI_MODAL.btnRename.removeEventListener('click', renameNickname);
        showHideBtn(UI_MODAL.btnRename, 'hide');
    }
}

// Получить код
function getCode() {
    if (isEmptyField(UI_MODAL.enterFieldModal)) return;

    getDataServer(URL.urlToken, API_METHOD.post, null, {
        email: getValueField(UI_MODAL.enterFieldModal),
    })
        .then((answer) => {
            if (answer.status === 'true') {
                clearField(UI_MODAL.enterFieldModal);
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

// Получить подтверждение авторизации
function enterCode() {
    if (isEmptyField(UI_MODAL.enterFieldModal)) return;

    setCookie('token', `${getValueField(UI_MODAL.enterFieldModal)}`);
    getDataServer(URL.urlDataProfile, API_METHOD.get, true)
        .then((answer) => {
            if (answer.status === 'true') {
                clearField(UI_MODAL.enterFieldModal);
                activeDisableBtn(UI_MODAL.btnSingIn, 'disabled');
                // hideModal('none');
                chekAuthorization();
                UI_MODAL.enterFieldModal.removeEventListener(
                    'input',
                    actionInputConfirmation
                );
                console.log(answer);
                setCookie('nickname', answer.answer.name);
                renderNicknameProfile(getCookie('nickname'));
            } else if (answer.status === 'false') {
                return;
            }
        })
        .catch((error) => {
            console.log(`Error: ${error.message}`);
        });
}

// Смена имени
function renameNickname() {
    if (isEmptyField(UI_MODAL.enterFieldModal)) return;
    getDataServer(URL.urlToken, API_METHOD.patch, true, {
        name: getValueField(UI_MODAL.enterFieldModal),
    }).then((result) => {
        setCookie('nickname', result.answer.name);
        renderNicknameProfile(getCookie('nickname'));
    });
    clearField(UI_MODAL.enterFieldModal);
    changeIconBtn(
        UI_MODAL.enterFieldModal,
        UI_MODAL.btnRename,
        ICONS.srcBtnRenameActive,
        ICONS.srcBtnRenameDisabled
    );
}

// Действия при вводе в input авторизации ПОЛУЧИТЬ КОД
function actionInputAuthorization() {
    const valueField = getValueField(UI_MODAL.enterFieldModal);

    if (validateEmail(valueField)) {
        activeDisableBtn(UI_MODAL.btnGiveCode, 'active');
    } else {
        activeDisableBtn(UI_MODAL.btnGiveCode, 'disabled');
    }
}

// Действия при вводе в input подтверждения ВВЕСТИ КОД
function actionInputConfirmation() {
    if (isEmptyField(UI_MODAL.enterFieldModal)) {
        activeDisableBtn(UI_MODAL.btnSingIn, 'disabled');
        return;
    } else {
        activeDisableBtn(UI_MODAL.btnSingIn, 'active');
    }
}

// Действия при вводе в input СМЕНЫ ИМЕНИ
function actionInputRename() {
    changeIconBtn(
        UI_MODAL.enterFieldModal,
        UI_MODAL.btnRename,
        ICONS.srcBtnRenameActive,
        ICONS.srcBtnRenameDisabled
    );
}

// Действие по кнопке ввести код
function actionBtnEnterCode() {
    // if (isEmptyField(UI_MODAL.enterFieldModal)) return;
    clearField(UI_MODAL.enterFieldModal);
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

// Выход из чата
function leaveTheChat() {
    removeCkookie('token');
    removeCkookie('nickname');
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
    if (isEmptyField(UI.enterFieldChat)) {
        return;
    } else {
        addMessage(getValueMessageForm(), new Date(), CLASS.sendingMessage);
        clearField(UI.enterFieldChat);
        changeIconBtn(
            UI.enterFieldChat,
            UI.btnSend,
            ICONS.srcBtnActive,
            ICONS.srcBtnDisabled
        );
    }
}

// Данные(текст сообщения) из формы
function getValueMessageForm() {
    const formData = new FormData(UI.form);
    return formData.get('message');
}

// Добавление сообщения
function addMessage(textMessage, time, classMessage) {
    TEMPLATE.messageTextTemlate.textContent = textMessage;
    TEMPLATE.messageTimeTemplate.textContent = correctDate(time);

    let message = tempContainer.content.cloneNode(true);

    const massageContainerTemp = message.querySelector('.chat-dialog__message');
    massageContainerTemp.classList.add(classMessage);
    UI.dialogWindow.append(message);
    scrollBottomDialog();
}

function renderHistory() {
    getDataServer(URL.urlHistoryMessages, API_METHOD.get, true)
        .then((result) => result.answer.messages)
        .then((messages) => {
            messages.map((message) => {
                addMessage(
                    message.text,
                    message.createdAt,
                    CLASS.sendingMessage
                );
            });
        });
}

// renderHistory();

// Локалсторедж
// Добавление сообщений из локалсторедж
// функцию рендер
// обработка ctrl + enter и shift + enter для переноса строки.
// Поправить рендер никнейма
