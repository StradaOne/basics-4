const DOM_ELEMENTS = {
    LOGOUT: document.querySelector('.chat-header-item.logout'),
    SETTINGS: document.querySelector('.chat-header-item.settings'),
    FORM_SEND : document.querySelector('.chat-footer-form'),
    INPUT_MESSAGE: document.querySelector('.chat-footer-form-message_field'),
    MESSAGE_BLOCK : document.querySelector(".chat-mainWindow-wrapper"),
    MY_TEMPLATE : document.querySelector('#my_message'),
    COMPANION_TEMPLATE : document.querySelector('#companion_message')
}
const TAG_DIALOG =  {
    MODAL_WINDOW_SET: document.querySelector('.modalWindow_settings'),
    MODAL_CLOSE_SET : document.querySelector('.modalWindow_settings-header-close'),
    MODAL_FORM_SET : document.querySelector('#modal_settings_form'),
    MODAL_INPUT_SET : document.querySelector('#modal_settings_input'),
    MODAL_WINDOW_AUT: document.querySelector('.modalWindow_autorization'),
    MODAL_CLOSE_AUT : document.querySelector('.modalWindow_autorization-header-close'),
    MODAL_INPUT_AUT: document.querySelector('#modal_autorization_input'),
    MODAL_WINDOW_VERIFY: document.querySelector('.modalWindow_verification'),
    MODAL_CLOSE_VERIFY : document.querySelector('.modalWindow_verification-header-close'),
    MODAL_LOGIN_VERIFY: document.querySelector('#modal_verification_btn'),
    MODAL_INPUT_VERIFY: document.querySelector('#modal_verification_input'),
    MODAL_GET_CODE: document.querySelector('#modal_autorization_btn_enter'),
    MODAL_ENTER_CODE: document.querySelector('#modal_autorization_btn_get'),
}


export {DOM_ELEMENTS,TAG_DIALOG}