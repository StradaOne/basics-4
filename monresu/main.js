import { openModal, closeModal, converterTime } from "./modules/functions.mjs";
import { getData, sendCode, changeName, getMessages, fetchData, token, checkCode } from "./modules/api.mjs";

const settingsBtn = document.querySelector('.settings-button');
const settingsModal = document.querySelector('.settings-modal');
const authBtn = document.querySelector('.auth-button');
const authModal = document.querySelector('.authrozation-modal');
const chatNameInputForm = document.querySelector('.chat-name-input-form');
const emailForm = document.querySelector('.email-input-form');
const submitForm = document.querySelector('.code-input-form');
const inputCodeBtn = document.querySelector('.input-code');
const submitModal = document.querySelector('.submit-modal');

const messageForm = document.querySelector('.message-form');

const templateMessage = document.querySelector('.template-message');
const messageContainer = document.querySelector('.message-container');

const user = {
    name: await fetchData('name'),
    email: await fetchData('email'),
};

settingsBtn.addEventListener('click', () => {
    openModal(settingsModal);
    const closeBtn = document.querySelector('.close-settings');
    closeBtn.addEventListener('click', function handler() {
        closeModal(settingsModal);
        removeEventListener('click', handler);
    });
});

authBtn.addEventListener('click', () => {
    openModal(authModal);
    const closeBtn = document.querySelector('.close-auth');
    closeBtn.addEventListener('click', function handler() {
        closeModal(authModal);
        removeEventListener('click', handler);
    });
})

emailForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    sendCode(emailForm);
});

chatNameInputForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    closeModal(settingsModal);
    const name = new FormData(chatNameInputForm).get('name');
    changeName(name);
    user.name = name;
    getData();
});

submitForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const code = new FormData(submitForm).get('code');
    if (checkCode(code)) {
        localStorage.setItem('token', JSON.stringify(code))
        Cookies.set('token', code);
        closeModal(submitModal);
        return;
    } else {
        console.error('КОД НЕ ВЕРНЫЙ')
    }
})

inputCodeBtn.addEventListener('click', () => {
    closeModal(authModal);
    openModal(submitModal);
});

submitModal.addEventListener('click', (event) => {
    if (event.target.classList.contains('close-button')) {
        closeModal(submitModal);
    };
})



function createMessageElement(author, message, time, email, me = false) {
    const classMessage = email === user.email ? 'my-message' : 'other-message';
    const messageBlock = document.createElement('div');
    messageBlock.append(templateMessage.content.cloneNode(true));
    const authorMessage = messageBlock.querySelector('.author-message');
    const textMessage = messageBlock.querySelector('.text-message');
    const timeMessage = messageBlock.querySelector('.time-message');
    messageBlock.classList.add('message');
    authorMessage.textContent = (!me ? author : user.name) + ': ';
    textMessage.textContent = message;
    timeMessage.textContent = time;
    messageBlock.classList.add(classMessage);
    return messageBlock;
}



async function renderMessages() {
    const data = await getMessages();
    const messages = data.messages.reverse();

    const messageElements = messages.map(message => {
        let me = false;
        if (message.user.email === user.email) me = true;
        return createMessageElement(message.user.name, message.text, converterTime(message.createdAt), message.user.email, me);
    });

    messageContainer.append(...messageElements.slice(0, 30));
    let i = 30;
    messageContainer.addEventListener('scroll', function handler() {
        var scrollThreshold = 10; // Погрешность
        var isScrolledToBottom = messageContainer.scrollTop >= messageContainer.scrollHeight - messageContainer.clientHeight - scrollThreshold;

        if (isScrolledToBottom) {
            messageContainer.append(...messageElements.slice(i, i + 20));
            i += 20;
            messageContainer.scrollTop = messageContainer.scrollHeight;
        }

        if (i >= messages.length) {
            console.log('Выводить больше нечего');
            messageContainer.removeEventListener('scroll', handler);
        };
    });
}

renderMessages();

const socket = new WebSocket(`wss://edu.strada.one/websockets?${token}`);
socket.onmessage = function (event) {
    const data = JSON.parse(event.data);
    const author = data.user.name;
    const email = data.user.email;
    const text = data.text;
    const timeMessage = converterTime(data.createdAt);
    let me = false;
    if (data.user.email === user.email) me = true;
    const elem = createMessageElement(author, text, timeMessage, email, me);
    messageContainer.append(elem);
    messageContainer.scrollTop = messageContainer.scrollHeight;
};
socket.onerror = function (error) {
    console.log(error);
};


messageForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const textMessage = new FormData(messageForm).get('message');
    socket.send(JSON.stringify({ text: textMessage }));
    messageContainer.scrollTop = messageContainer.scrollHeight;
    messageForm.reset();
});

