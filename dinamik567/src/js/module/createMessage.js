import {STORAGE_CLASSNAME_MESSAGE} from "./defaultSettings.js";
import {UI_ELEMENTS} from "./UI_ELEMENTS.js";

export function createMessage(text, author, companion = STORAGE_CLASSNAME_MESSAGE.ME) {
    const message = document.createElement('div');
    message.classList.add(STORAGE_CLASSNAME_MESSAGE.MESSAGE, STORAGE_CLASSNAME_MESSAGE.CHAT_MESSAGE);

    if (companion === STORAGE_CLASSNAME_MESSAGE.ME) {
        message.classList.add(STORAGE_CLASSNAME_MESSAGE.MESSAGE_ME);
    }

    if (companion === STORAGE_CLASSNAME_MESSAGE.COMPANION) {
        message.classList.add(STORAGE_CLASSNAME_MESSAGE.MESSAGE_COMPANION);
    }

    if (companion !== STORAGE_CLASSNAME_MESSAGE.ME
        && companion !== STORAGE_CLASSNAME_MESSAGE.COMPANION) {

        console.error('Неизвестный собеседник');
        return
    }

    message.appendChild(UI_ELEMENTS.messageTemplate.content.cloneNode(true));
    message.querySelector('.' + STORAGE_CLASSNAME_MESSAGE.AUTHOR).textContent = author + ':';
    message.querySelector('.' + STORAGE_CLASSNAME_MESSAGE.TEXT).textContent = text;

    const dateNow = new Date();
    message.querySelector('.' + STORAGE_CLASSNAME_MESSAGE.TIME).textContent =
        `${dateNow.getHours()}:${dateNow.getMinutes()}`

    UI_ELEMENTS.screenChat.appendChild(message);
}