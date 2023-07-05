import {UI_ELEMENTS} from "./module/UI_ELEMENTS.js";
import {STORAGE_CLASSNAME_MESSAGE, STORAGE_CLASSNAME_FORM} from './module/defaultSettings.js'
import {createMessage} from "./module/createMessage.js";


UI_ELEMENTS.messageForm.addEventListener('submit', function (e) {

    e.preventDefault();
    if (e.target.value === '') {
        return;
    }

    const inputMessage = e.target.querySelector('.' + STORAGE_CLASSNAME_FORM.fieldInputMessage);
    createMessage(inputMessage.value, 'Владимир Путин', STORAGE_CLASSNAME_MESSAGE.COMPANION);
    inputMessage.value = '';
})




