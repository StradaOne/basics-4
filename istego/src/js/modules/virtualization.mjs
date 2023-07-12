import { UI } from './variables.mjs';
import { addMessage } from './help-functions.mjs';
import { getStorage } from './storage.mjs';

let indexMessage = 0;

function limitMessages(arrayHistoryMessages, limitCount) {
    for (let i = 0; i < limitCount; i++) {
        if (indexMessage >= arrayHistoryMessages.length) {
            UI.dialogWindow.removeEventListener(
                'scroll',
                virtualScrollMessages
            );
            indexMessage = 0;
            return;
        }

        addMessage(arrayHistoryMessages[indexMessage], 'prepend');

        indexMessage++;
    }
}

function virtualScrollMessages() {
    // начальная высота
    let prevScrollHeight = UI.dialogWindow.scrollHeight;

    if (UI.dialogWindow.scrollTop === 0) {
        limitMessages(getStorage('messages'), 20);

        // Рассчитываем разницу в высоте контейнера после подгрузки сообщений
        let newScrollHeight = UI.dialogWindow.scrollHeight;
        let scrollDiff = newScrollHeight - prevScrollHeight;

        // Устанавливаем новую прокрутку для сохранения позиции отображаемого контента
        UI.dialogWindow.scrollTop = scrollDiff;
    }
}

function clearIndexMessage() {
    indexMessage = 0;
}

export { limitMessages, virtualScrollMessages, clearIndexMessage };
