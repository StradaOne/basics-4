import {
    UI,
    UI_MODAL,
    ICONS,
    MODAL_TITLE,
    textarea,
    URL,
    API_METHOD,
} from './modules/variables.mjs';
import { setCookie, getCookie, removeCookie } from './modules/cookie.mjs';
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
    changeIconBtn,
    showHidePreload,
    showNotificationModal,
    containsCyrillic,
    addMessage,
    clearUiDialogChat
} from './modules/help-functions.mjs';
import 'emoji-picker-element';
import { setStorage, getStorage, removeStorage } from './modules/storage.mjs';
import {
    limitMessages,
    virtualScrollMessages,
    clearIndexMessage,
} from './modules/virtualization.mjs';

// Для webSocket
let socket;

chekAuthorization();

// Обработка клика ПОЛУЧИТЬ КОД
UI_MODAL.btnGiveCode.addEventListener('click', getCode);

// Обработка поля ввода Получить код
UI_MODAL.enterFieldModal.addEventListener('input', actionInputGetCode);

// Обработка кнопки Войти
UI_MODAL.btnSingIn.addEventListener('click', getConfirmAuthorization);

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

//Слушатель клавиши enter отправить сообщение
document.addEventListener('keydown', (event) => {
    if (event.code === 'Enter' && !event.ctrlKey && !event.shiftKey) {
        sendingMessage(event);
    }
});

// Обработка клика по emodji
UI.emoji.addEventListener('emoji-click', (event) => {
    UI.enterFieldChat.textContent += event.detail.unicode;
    changeIconBtn(
        UI.enterFieldChat,
        UI.btnSend,
        ICONS.srcBtnActive,
        (ъ = ICONS.srcBtnDisabled)
    );
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(UI.enterFieldChat);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
    textarea.value = getValueField(UI.enterFieldChat);
});

// Событие на скролл диалога чата
UI.dialogWindow.addEventListener('scroll', virtualScrollMessages);

// ==========================ФУНКЦИИ============================
// =============================================================

//Проверка на авторизацию при запуске приложения
function chekAuthorization() {
    if (getCookie('token')) {
        hideModal();
        clearIndexMessage();
        connectionWebSocket();
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
        // Событие на скролл диалога чата
        UI.dialogWindow.addEventListener('scroll', virtualScrollMessages);
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
        UI.dialogWindow.removeEventListener('scroll', virtualScrollMessages);
        // Обработка кнопки ввести код
        UI_MODAL.btnEnterCode.addEventListener('click', actionBtnEnterCode);
        showHideBtn(UI_MODAL.btnRename, 'hide');
    }
}

// ввести код
function actionBtnEnterCode() {
    clearField(UI_MODAL.enterFieldModal);
    UI_MODAL.enterFieldModal.removeEventListener('input', actionInputGetCode);
    showNotificationModal();

    renderModal(
        MODAL_TITLE.confirmation.title,
        MODAL_TITLE.confirmation.inputTitle,
        MODAL_TITLE.confirmation.placeholder
    );

    showHideBtn(UI_MODAL.btnGiveCode, 'hide');
    showHideBtn(UI_MODAL.btnEnterCode, 'hide');
    showHideBtn(UI_MODAL.btnSingIn, 'show');
    showHideBtn(UI_MODAL.btnBack, 'show');

    UI_MODAL.enterFieldModal.addEventListener('input', actionInputSignIn);
    UI_MODAL.btnBack.addEventListener('click', clickBtnBack);
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
                showNotificationModal('Авторизация', 'ok');
            } else if (answer.status === 'false') {
                activeDisableBtn(UI_MODAL.btnGiveCode, 'disabled');
                showNotificationModal('Авторизация', 'error');
            }
        })
        .catch((error) => {
            console.log(`Error: ${error.message}`);
            activeDisableBtn(UI_MODAL.btnGiveCode, 'disabled');
            showNotificationModal('Авторизация', 'error');
        });
}

// Действия при вводе в input авторизации ПОЛУЧИТЬ КОД
function actionInputGetCode() {
    const valueField = getValueField(UI_MODAL.enterFieldModal);

    if (
        validateEmail(valueField) &&
        !containsCyrillic(getValueField(UI_MODAL.enterFieldModal))
    ) {
        activeDisableBtn(UI_MODAL.btnGiveCode, 'active');
    } else {
        activeDisableBtn(UI_MODAL.btnGiveCode, 'disabled');
    }
}

// Получить подтверждение авторизации кнопка ВОЙТИ
function getConfirmAuthorization() {
    if (isEmptyField(UI_MODAL.enterFieldModal)) return;

    setCookie('token', `${getValueField(UI_MODAL.enterFieldModal)}`);
    getDataServer(URL.urlDataProfile, API_METHOD.get, true)
        .then((answer) => {
            if (answer.status === 'true') {
                clearField(UI_MODAL.enterFieldModal);
                activeDisableBtn(UI_MODAL.btnSingIn, 'disabled');
                showHideBtn(UI_MODAL.btnBack, 'hide');
                UI_MODAL.enterFieldModal.removeEventListener(
                    'input',
                    actionInputSignIn
                );
                setCookie('nickname', answer.answer.name);
                setCookie('email', answer.answer.email);
                renderNicknameProfile(getCookie('nickname'));
                chekAuthorization();
                UI_MODAL.btnEnterCode.removeEventListener(
                    'click',
                    actionBtnEnterCode
                );
                UI_MODAL.btnGiveCode.removeEventListener('click', getCode);
                showNotificationModal();
            } else if (answer.status === 'false') {
                console.log(answer);
                removeCookie('token');
                showNotificationModal(
                    MODAL_TITLE.confirmation.title,
                    'errorCode'
                );
                return;
            }
        })
        .catch((error) => {
            showNotificationModal(MODAL_TITLE.confirmation.title, 'error');
            console.log(`Error!!!!: ${error.message}`);
        });
}

// Действия при вводе в input подтверждения поля ВОЙТИ
function actionInputSignIn() {
    if (
        isEmptyField(UI_MODAL.enterFieldModal) ||
        containsCyrillic(getValueField(UI_MODAL.enterFieldModal))
    ) {
        activeDisableBtn(UI_MODAL.btnSingIn, 'disabled');
    } else {
        activeDisableBtn(UI_MODAL.btnSingIn, 'active');
    }
}

// Смена имени
function renameNickname() {
    if (isEmptyField(UI_MODAL.enterFieldModal)) return;

    getDataServer(URL.urlToken, API_METHOD.patch, true, {
        name: getValueField(UI_MODAL.enterFieldModal),
    })
        .then((result) => {
            setCookie('nickname', result.answer.name);
            renderNicknameProfile(getCookie('nickname'));
            UI_MODAL.notificationName.textContent = getCookie('nickname');
            socket.close(1000, 'работа закончена');
            connectionWebSocket();
            clearField(UI_MODAL.enterFieldModal);
            changeIconBtn(
                UI_MODAL.enterFieldModal,
                UI_MODAL.btnRename,
                ICONS.srcBtnRenameActive,
                ICONS.srcBtnRenameDisabled
            );
            showNotificationModal('Настройки', 'ok');
            setTimeout(() => {
                showNotificationModal();
            }, 2000);
        })
        .catch((error) => {
            console.log(error);
            showNotificationModal('Настройки', 'error');
        });
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

// Выход из чата
function leaveTheChat() {
    UI.dialogWindow.removeEventListener('scroll', virtualScrollMessages);
    removeCookie('token');
    removeCookie('nickname');
    removeCookie('email');
    socket.close(1000, 'работа закончена');
    removeStorage('messages');
    clearUiDialogChat();
    chekAuthorization();
    renderModal(
        MODAL_TITLE.authorization.title,
        MODAL_TITLE.authorization.inputTitle,
        MODAL_TITLE.authorization.placeholder
    );
    showHideBtn(UI_MODAL.btnGiveCode, 'show');
    showHideBtn(UI_MODAL.btnEnterCode, 'show');
    showHideBtn(UI_MODAL.btnSingIn, 'hide');
    UI_MODAL.enterFieldModal.addEventListener('input', actionInputGetCode);
    UI_MODAL.btnGiveCode.addEventListener('click', getCode);
}

// Отправка сообщения
function sendingMessage(event) {
    event.preventDefault();
    if (isEmptyField(UI.enterFieldChat)) return;
    socket.send(JSON.stringify({ text: getValueMessageForm() }));
    clearField(UI.enterFieldChat);
    changeIconBtn(
        UI.enterFieldChat,
        UI.btnSend,
        ICONS.srcBtnActive,
        ICONS.srcBtnDisabled
    );
}

// Данные(текст сообщения) из формы
function getValueMessageForm() {
    const formData = new FormData(UI.form);
    return formData.get('message');
}

// Загрузка истории сообщений
function getHistoryMessages() {
    getDataServer(URL.urlHistoryMessages, API_METHOD.get, true)
        .then((result) => result.answer.messages)
        .then((messages) => {
            setStorage('messages', messages);
            limitMessages(getStorage('messages'), 20);
            scrollBottomDialog();
        });
}

// Установка соединения с WebSocket
function connectionWebSocket() {
    socket = new WebSocket(
        `wss://edu.strada.one/websockets?${getCookie('token')}`
    );

    socket.onopen = function (e) {
        if (socket.readyState === 0) {
            showHidePreload('none');
            alert('соединение не установлено!');
        } else if (socket.readyState === 1) {
            console.log('[open] Соединение установлено');
            getHistoryMessages();
        }
    };

    socket.onmessage = function (event) {
        const serverAnswer = JSON.parse(event.data);
        // console.log(serverAnswer);

        addMessage(serverAnswer, 'append');
        scrollBottomDialog();
    };

    socket.onclose = function (event) {
        if (event.wasClean) {
            console.log(
                `[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`
            );
            removeStorage('messages');
        } else {
            showHidePreload('flex');
            console.log('[close] Соединение прервано');
            removeStorage('messages');
            connectionWebSocket();
        }
    };

    socket.onerror = function (error) {
        alert(error);
    };
}

// Клик по кнопке назад
function clickBtnBack() {
    activeDisableBtn(UI_MODAL.btnGiveCode, 'disabled');
    activeDisableBtn(UI_MODAL.btnSingIn, 'disabled');
    showHideBtn(UI_MODAL.btnBack, 'hide');
    showHideBtn(UI_MODAL.btnSingIn, 'hide');
    showHideBtn(UI_MODAL.btnGiveCode, 'show');
    showHideBtn(UI_MODAL.btnEnterCode, 'show');
    renderModal(
        MODAL_TITLE.authorization.title,
        MODAL_TITLE.authorization.inputTitle,
        MODAL_TITLE.authorization.placeholder
    );
    UI_MODAL.enterFieldModal.addEventListener('input', actionInputGetCode);
    UI_MODAL.btnBack.removeEventListener('click', clickBtnBack);
    UI_MODAL.enterFieldModal.removeEventListener('input', actionInputSignIn);
    clearField(UI_MODAL.enterFieldModal);
    showNotificationModal();
}

// Рефакторинг
// функцию рендер
// обработка ctrl + enter и shift + enter для переноса строки.

// UrlDataProfile использовать
// на старте приложения можно получить профиль текущего пользователя(если есть токен),
// заодно и токен на валидность провериться, если ответ придет норм то токен корректный и можно сокет подключать