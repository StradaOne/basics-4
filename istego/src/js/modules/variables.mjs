import srcBtnDisabled from '../../icons/iconSendDisabled.svg';
import srcBtnActive from '../../icons/iconSend.svg';
import srcBtnRenameActive from '../../icons/iconOkActive.svg';
import srcBtnRenameDisabled from '../../icons/iconOkDisabled.svg';

export const UI = {
    dialogWindow: document.querySelector('.chat-dialog'),
    enterFieldChat: document.querySelector('.chat-form__inp'),
    btnSend: document.querySelector('.btn-send'),
    form: document.querySelector('.chat-form'),
    btnSettings: document.querySelector('.btn-settings'),
    btnSignOut: document.querySelector('.btn-exit'),
    preload: document.querySelector('.preload-wrapper'),
    nickname: document.querySelector('.nickname'),
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
};

export const ICONS = {
    srcBtnDisabled: `url("${srcBtnDisabled}")`,
    srcBtnActive: `url("${srcBtnActive}")`,
    srcBtnRenameActive: `url("${srcBtnRenameActive}")`,
    srcBtnRenameDisabled: `url("${srcBtnRenameDisabled}")`,
};

export const tempContainer = document.querySelector('#template');
export const textarea = document.querySelector('.chat-form__textarea');

export const TEMPLATE = {
    messageTimeTemplate: tempContainer.content.querySelector(
        '.chat-dialog__message-time'
    ),
    messageTextTemlate: tempContainer.content.querySelector(
        '.chat-dialog__message-text'
    ),
};


export const MODAL_TITLE = {
    authorization: {
        title: 'Авторизация',
        inputTitle: 'Почта:',
        placeholder: 'Введите почту...',
    },
    confirmation: {
        title: 'Подтверждение',
        inputTitle: 'Код:',
        placeholder: 'Введите код...',
    },
    settings: {
        title: 'Настройки',
        inputTitle: 'Имя в чате:',
        placeholder: 'Введите имя...',
    },
};