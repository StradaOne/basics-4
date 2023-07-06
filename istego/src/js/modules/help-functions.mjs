import { UI, CLASS, UI_MODAL, MODAL_TITLE } from "./variables.mjs";
import { format } from "date-fns";

// Показать/Скрыть preload
function showHidePreload(display) {
    UI.preload.style.display = display;
}

// Рендер Имени в чате
function renderNicknameProfile(nickname) {
    UI.nickname.textContent = nickname;
}

// Скролл всегда вниз при запуске
function scrollBottomDialog() {
    UI.dialogWindow.scrollTop = UI.dialogWindow.scrollHeight;
}

// ПОКАЗАТЬ/СКРЫТЬ КНОПКУ
function showHideBtn(btn, action) {
    if (action === "hide") btn.classList.add(CLASS.hideBtn);
    if (action === "show") btn.classList.remove(CLASS.hideBtn);
}

// Диактивация кнопки
function disableBtn(btn, btnStatus) {
    btn.disabled = btnStatus;
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

// Активировать или диактивировать кнопку
function activeDisableBtn(btn, action) {
    if (action === "active") {
        btn.classList.add(CLASS.activeBtn);
        btn.disabled = "";
    } else if (action === "disabled") {
        btn.classList.remove(CLASS.activeBtn);
        btn.disabled = "false";
    }
}

// Очистка поля ввода input/pre
function clearField(field) {
    if (field.tagName.toLowerCase() === "input") {
        field.value = "";
    } else {
        field.textContent = "";
    }
}

// Получить значение поля input/pre
function getValueField(field) {
    if (field.tagName.toLowerCase() === "input") {
        return field.value.trim();
    } else {
        return field.textContent.trim();
    }
}

// Проверка на пустоту поля input/pre
function isEmptyField(field) {
    const valueField = getValueField(field);

    if (valueField === "") return true;
    if (valueField) return false;
}

// Фрматирование даты в корректную
function correctDate(date) {
    return format(new Date(date), "HH:mm dd.LL.yy ");
}

// Смена иконок у кнопок при вводе в поле
function changeIconBtn(field, btn, srcIconActive, scrIconDisabled) {
    if (isEmptyField(field)) {
        disableBtn(btn, true);

        btn.style.backgroundImage = scrIconDisabled;
    } else {
        disableBtn(btn, false);

        btn.style.backgroundImage = srcIconActive;
    }
}

// Уведомления для модалки
function showNotificationModal(modalTitle = "", status = "") {
    UI_MODAL.notification.classList.remove(CLASS.notificationOk);
    UI_MODAL.notification.classList.remove(CLASS.notificationError);

    // Авторизация
    if (modalTitle === MODAL_TITLE.authorization.title && status === "ok") {
        UI_MODAL.notificationText.textContent =
            MODAL_TITLE.authorization.notificationOk;
        UI_MODAL.notification.classList.add(CLASS.notificationOk);
    } else if (
        modalTitle === MODAL_TITLE.authorization.title &&
        status === "error"
    ) {
        UI_MODAL.notificationText.textContent =
            MODAL_TITLE.authorization.notificationError;
        UI_MODAL.notification.classList.add(CLASS.notificationError);
    }

    // Войти
    if (
        modalTitle === MODAL_TITLE.confirmation.title &&
        status === "errorCode"
    ) {
        UI_MODAL.notificationText.textContent =
            MODAL_TITLE.confirmation.notificationIncorrectCode;
        UI_MODAL.notification.classList.add(CLASS.notificationError);
    } else if (
        modalTitle === MODAL_TITLE.confirmation.title &&
        status === "error"
    ) {
        UI_MODAL.notificationText.textContent =
            MODAL_TITLE.authorization.notificationError;
        UI_MODAL.notification.classList.add(CLASS.notificationError);
    }

    // Настройки
    if (modalTitle === MODAL_TITLE.settings.title && status === "ok") {
        UI_MODAL.notificationText.textContent =
            MODAL_TITLE.settings.notificationOk;
        UI_MODAL.notification.classList.add(CLASS.notificationOk);
    } else if (
        modalTitle === MODAL_TITLE.settings.title &&
        status === "error"
    ) {
        UI_MODAL.notificationText.textContent =
            MODAL_TITLE.settings.notificationError;
        UI_MODAL.notification.classList.add(CLASS.notificationError);
    }
}

// Проверка на кириллицу
function containsCyrillic(text) {
    const cyrillicRegex = /[\u0400-\u04FF]/;

    return cyrillicRegex.test(text);
}

export {
    showHidePreload,
    renderNicknameProfile,
    scrollBottomDialog,
    showHideBtn,
    disableBtn,
    validateEmail,
    activeDisableBtn,
    clearField,
    getValueField,
    isEmptyField,
    correctDate,
    changeIconBtn,
    showNotificationModal,
    containsCyrillic,
};
