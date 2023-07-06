import srcBtnDisabled from '../../icons/iconSendDisabled.svg';
import srcBtnActive from '../../icons/iconSend.svg';
import srcBtnRenameActive from '../../icons/iconOkActive.svg';
import srcBtnRenameDisabled from '../../icons/iconOkDisabled.svg';
import srcBtnEmojiActive from '../../icons/iconEmojiActive.svg';
import srcBtnEmojiDisabled from '../../icons/iconEmojiDisabled.svg';

export const UI = {
    dialogWindow: document.querySelector('.chat-dialog'),
    enterFieldChat: document.querySelector('.chat-form__inp'),
    btnSend: document.querySelector('.btn-send'),
    form: document.querySelector('.chat-form'),
    btnSettings: document.querySelector('.btn-settings'),
    btnSignOut: document.querySelector('.btn-exit'),
    preload: document.querySelector('.preload-wrapper'),
    nickname: document.querySelector('.nickname'),
    btnEmoji: document.querySelector('.btn-emoji'),
    emoji: document.querySelector('emoji-picker'),
};

export const UI_MODAL = {
    modal: document.querySelector('#modal-js'),
    btnModalClose: document.querySelector('.modal__btn-close'),
    btnGiveCode: document.querySelector('.btn-give-code'),
    btnEnterCode: document.querySelector('.btn-enter-code'),
    btnSingIn: document.querySelector('.btn-sing-in'),
    enterFieldModal: document.querySelector('.modal-input'),
    titleModal: document.querySelector('.modal__title-text'),
    titleInputModal: document.querySelector('.modal-form__title'),
    btnRename: document.querySelector('.btn-rename'),
    btnBack: document.querySelector('.btn-back'),
    notification: document.querySelector('.notification'),
    notificationText: document.querySelector('.notification__text'),
    notificationName: document.querySelector('.notification__text-name'),
};

export const MODAL_TITLE = {
    authorization: {
        title: 'Авторизация',
        inputTitle: 'Почта:',
        placeholder: 'Введите почту...',
        notificationOk: 'Код успешно отправлен вам на почту!',
        notificationError: 'Произошла ошибка, повторите снова или попозже',
    },
    confirmation: {
        title: 'Подтверждение',
        inputTitle: 'Код:',
        placeholder: 'Введите код...',
        notificationError: 'Произошла ошибка, повторите снова или попозже',
        notificationIncorrectCode: 'Не верный код авторизации',
    },
    settings: {
        title: 'Настройки',
        inputTitle: 'Имя в чате:',
        placeholder: 'Введите имя...',
        notificationOk: 'Имя успешно изменено на ',
        notificationError: 'Произошла ошибка, повторите снова или попозже',
    },
};

export const ICONS = {
    srcBtnDisabled: `url("${srcBtnDisabled}")`,
    srcBtnActive: `url("${srcBtnActive}")`,
    srcBtnRenameActive: `url("${srcBtnRenameActive}")`,
    srcBtnRenameDisabled: `url("${srcBtnRenameDisabled}")`,
    srcBtnEmojiActive:`url("${srcBtnEmojiActive}")`,
    srcBtnEmojiDisabled:`url("${srcBtnEmojiDisabled}")`,
};

export const CLASS = {
    sendingMessage: 'sent-message',
    inboxMessage: 'in-message',
    hideBtn: 'hide-btn',
    activeBtn: 'active-btn',
    notificationOk: 'show-notification-green',
    notificationError: 'show-notification-red',
}

export const tempContainer = document.querySelector('#template');
export const textarea = document.querySelector('.chat-form__textarea');

export const TEMPLATE = {
    messageTimeTemplate: tempContainer.content.querySelector(
        '.dialog-info__message-time'
    ),
    messageTextTemlate: tempContainer.content.querySelector(
        '.chat-dialog__message-text'
    ),
    messageNicknameTemlate: tempContainer.content.querySelector(
        '.dialog-info__message-nickname'
    ),
};

export const URL = {
    urlToken: 'https://edu.strada.one/api/user',
    urlDataProfile: 'https://edu.strada.one/api/user/me',
    urlHistoryMessages: 'https://edu.strada.one/api/messages/',
};

export const API_METHOD = {
    get: 'GET',
    post: 'POST',
    patch: 'PATCH',
};
