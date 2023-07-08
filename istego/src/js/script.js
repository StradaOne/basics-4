import Cookies from 'js-cookie';
import {
    UI,
    UI_MODAL,
    ICONS,
    TEMPLATE,
    MODAL_TITLE,
    tempContainer,
    textarea,
} from './modules/variables.mjs';

const URL = {
    urlToken: 'https://edu.strada.one/api/user',
    urlDataProfile: 'https://edu.strada.one/api/user/me',
};

chekAuthorization();

// Данные из поля чата в скрытое поле
UI.enterFieldChat.addEventListener('input', () => {
    changeIconBtn(UI.enterFieldChat);
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

// Обработка кнопки ввести код
UI_MODAL.btnEnterCode.addEventListener('click', actionBtnEnterCode);

// Обработка кнопки Войти
UI_MODAL.btnSingIn.addEventListener('click', authorization);

// =============================================================
// =============================================================

// запрос для получение токена
async function getToken(url, email) {
    try {
        showHidePreload('flex');

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({ email }),
        });

        const answer = await response.json();

        if (response.status === 200) {
            console.log(answer);

            return { status: 'true' };
        } else {
            console.log('ошибка', answer);
            console.log(response.status);

            return { status: 'false' };
        }
    } catch (error) {
        console.log(`Error: ${error.message}`);
    } finally {
        showHidePreload('none');
    }
}

// запрос для авторизации
async function getAuthorization(url) {
    try {
        showHidePreload('flex');

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                Authorization: `Bearer ${Cookies.get('token')}`,
            },
        });

        const answer = await response.json();

        if (response.status === 200) {
            // console.log(answer.name);

            return { status: 'true', answer };
        } else {
            console.log('ошибка', answer);
            console.log(response.status);

            return { status: 'false', answer };
        }
    } catch (error) {
        console.log(`Error: ${error.message}`);
    } finally {
        showHidePreload('none');
    }
}

// Получить подтверждение авторизации
function authorization() {
    if (isEmptyInputValue(UI_MODAL.enterFieldModal)) return;

    setCookie('token', `${getValueInput(UI_MODAL.enterFieldModal)}`);
    getAuthorization(URL.urlDataProfile)
        .then((answer) => {
            if (answer.status === 'true') {
                clearInputField(UI_MODAL.enterFieldModal);
                activeDisableBtn(UI_MODAL.btnSingIn, 'disabled');
                // hideModal('none');
                chekAuthorization();
                console.log(answer);
                UI.nickname.textContent = answer.answer.name;
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
            } else if (answer.status === 'false') {
                activeDisableBtn(UI_MODAL.btnGiveCode, 'disabled');
            }
        })
        .catch((error) => {
            console.log(`Error: ${error.message}`);
        });
}

//Проверка на авторизацию при запуске приложения
function chekAuthorization() {
    if (getCookie('token')) {
        hideModal();
        UI_MODAL.modal.addEventListener('click', modalDelegationClick);
    } else {
        renderModal(
            MODAL_TITLE.authorization.title,
            MODAL_TITLE.authorization.inputTitle,
            MODAL_TITLE.authorization.placeholder
        );
        showModal();
        UI_MODAL.modal.removeEventListener('click', modalDelegationClick);
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

// Действие по кнопке ввести код
function actionBtnEnterCode() {
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
    showHideBtn(UI_MODAL.btnSingIn, 'show');
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

// Отправка сообщения
function sendingMessage(event) {
    event.preventDefault();
    if (isEmptyEnterField(UI.enterFieldChat)) {
        return;
    } else {
        addMessage(getValueMessageForm(), '12:00', 'sent-message');
        clearEnterChatField();
        changeIconBtn(UI.enterFieldChat);
    }
}

// Показать/Скрыть preload
function showHidePreload(display) {
    UI.preload.style.display = display;
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
function changeIconBtn(field) {
    if (isEmptyEnterField(field)) {
        disableBtn(UI.btnSend, true);

        UI.btnSend.style.backgroundImage = ICONS.srcBtnDisabled;
    } else {
        disableBtn(UI.btnSend, false);

        UI.btnSend.style.backgroundImage = ICONS.srcBtnActive;
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

// UI_MODAL.modal.addEventListener('click', modalDelegationClick);

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

function setCookie(name, value) {
    Cookies.set(name, value);
}

function getCookie(name) {
    return Cookies.get(name);
}

// ======================================================
// ======================================================

// Разделить по модулям
// Локалсторедж
// Добавление сообщений из локалсторедж
// функцию рендер
// обработка ctrl + enter и shift + enter для переноса строки.
// Чтобы курсос был при наведении на поля ввода черточкой
// Функцию для получения времени
// Объект с переменными для классов входящее/исходящее сообщение
// Объект с данными для модалок

const messages = [
    {
        _id: '649e270da697a600113f9622',
        text: 'текст',
        user: {
            email: 'sonalavrushina@gmail.com',
            name: 'pipupopi228',
        },
        createdAt: '2023-06-30T00:51:25.564Z',
        updatedAt: '2023-06-30T00:51:25.564Z',
        __v: 0,
    },
    {
        _id: '649da944331fb50011c46b9c',
        text: 'а',
        user: {
            email: 'sonalavrushina@gmail.com',
            name: 'pipupopi228',
        },
        createdAt: '2023-06-29T15:54:44.680Z',
        updatedAt: '2023-06-29T15:54:44.680Z',
        __v: 0,
    },
    {
        _id: '649da944331fb50011c46b9b',
        text: 'ас',
        user: {
            email: 'sonalavrushina@gmail.com',
            name: 'pipupopi228',
        },
        createdAt: '2023-06-29T15:54:44.200Z',
        updatedAt: '2023-06-29T15:54:44.200Z',
        __v: 0,
    },
    {
        _id: '649b83907dec9f0010880346',
        text: 'v',
        user: {
            email: 'sonalavrushina@gmail.com',
            name: 'pipupopi228',
        },
        createdAt: '2023-06-28T00:49:20.007Z',
        updatedAt: '2023-06-28T00:49:20.007Z',
        __v: 0,
    },
    {
        _id: '649b838f7dec9f0010880345',
        text: 'v',
        user: {
            email: 'sonalavrushina@gmail.com',
            name: 'pipupopi228',
        },
        createdAt: '2023-06-28T00:49:19.131Z',
        updatedAt: '2023-06-28T00:49:19.131Z',
        __v: 0,
    },
    {
        _id: '649b838e7dec9f0010880344',
        text: 'v',
        user: {
            email: 'sonalavrushina@gmail.com',
            name: 'pipupopi228',
        },
        createdAt: '2023-06-28T00:49:18.973Z',
        updatedAt: '2023-06-28T00:49:18.973Z',
        __v: 0,
    },
    {
        _id: '649b838e7dec9f0010880343',
        text: 'v',
        user: {
            email: 'sonalavrushina@gmail.com',
            name: 'pipupopi228',
        },
        createdAt: '2023-06-28T00:49:18.815Z',
        updatedAt: '2023-06-28T00:49:18.815Z',
        __v: 0,
    },
    {
        _id: '649b838e7dec9f0010880342',
        text: 'v',
        user: {
            email: 'sonalavrushina@gmail.com',
            name: 'pipupopi228',
        },
        createdAt: '2023-06-28T00:49:18.646Z',
        updatedAt: '2023-06-28T00:49:18.646Z',
        __v: 0,
    },
    {
        _id: '649b838e7dec9f0010880341',
        text: 'v',
        user: {
            email: 'sonalavrushina@gmail.com',
            name: 'pipupopi228',
        },
        createdAt: '2023-06-28T00:49:18.457Z',
        updatedAt: '2023-06-28T00:49:18.457Z',
        __v: 0,
    },
    {
        _id: '649b838e7dec9f0010880340',
        text: 'v',
        user: {
            email: 'sonalavrushina@gmail.com',
            name: 'pipupopi228',
        },
        createdAt: '2023-06-28T00:49:18.275Z',
        updatedAt: '2023-06-28T00:49:18.275Z',
        __v: 0,
    },
    {
        _id: '649b838e7dec9f001088033f',
        text: 'v',
        user: {
            email: 'sonalavrushina@gmail.com',
            name: 'pipupopi228',
        },
        createdAt: '2023-06-28T00:49:18.098Z',
        updatedAt: '2023-06-28T00:49:18.098Z',
        __v: 0,
    },
    {
        _id: '649b838d7dec9f001088033e',
        text: 'v',
        user: {
            email: 'sonalavrushina@gmail.com',
            name: 'pipupopi228',
        },
        createdAt: '2023-06-28T00:49:17.916Z',
        updatedAt: '2023-06-28T00:49:17.916Z',
        __v: 0,
    },
    {
        _id: '649b838d7dec9f001088033d',
        text: 'f',
        user: {
            email: 'sonalavrushina@gmail.com',
            name: 'pipupopi228',
        },
        createdAt: '2023-06-28T00:49:17.749Z',
        updatedAt: '2023-06-28T00:49:17.749Z',
        __v: 0,
    },
    {
        _id: '649b838d7dec9f001088033c',
        text: 'v',
        user: {
            email: 'sonalavrushina@gmail.com',
            name: 'pipupopi228',
        },
        createdAt: '2023-06-28T00:49:17.549Z',
        updatedAt: '2023-06-28T00:49:17.549Z',
        __v: 0,
    },
];

const div = document.getElementById('div-text');
const messagesHTML = messages
    .map((message) => `<p>${message.text}</p>`);

    div.innerHTML = messagesHTML;
console.log(messagesHTML);
// div.innerHTML = messagesHTML;
