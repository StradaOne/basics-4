const API = {
  LINK: {
    URL: 'https://edu.strada.one/api',
    USER: 'user',
    ME: 'me',
    MESSAGES: 'messages',
  },
  METHOD: {
    POST: 'POST',
    PATCH: 'PATCH',
    GET: 'GET',
  },
  HEADER: {
    DEFAULT: {
      'Content-Type': 'application/json',
    },
  },
}

const WEB_SOCKET = {
  URL: 'wss://edu.strada.one/websockets',
}

const CLASS = {
  SHOW: 'show',
  CLOSE: 'close',
  MESSAGE_TEXT: '.message-text',
  MESSAGE_DATE: '.message-date',
  MESSAGE_MAIN: '.message-text--main-user',
  MESSAGE_ONLY: '.message-text--users',
  BTN_CLOSE: '.modal-btn-close',
  MODAL_CONTAINER: '.modal-container',
  MODAL_BOX: '.modal-box',
  INVALID: 'invalid',
  SYSTEM_MESSAGE: '.system-text',
}

const SYSTEM_MESSAGE = {
  NO_ENTRY: 'Войдите.',
  NO_EMAIL: 'Введите почту.',
  NO_NAME: 'Привет, Гость. Поменять имя можно в настройках.',
  HI: 'Привет',
  STORY_IS_UPLOADED: 'Вся история загружена.',
}

const ERROR = {
  WEB_SOCKET: {
    DISCONECTED: '[WebSocket] Потеряна связь с сервером.',
    OTHER: '[WebSocket] Произошла ошибка:',
  },
}

const LOG = {
  WEB_SOCKET: {
    CONNECTED: '[WebSocket] Связь с сервером установлена.',
  },
}

const SETTING_CONSOLE = {
  HEADING: {
    CONNECTED: '%c Conected ',
  },
  COLOR: {
    GREEN: 'color: white; background-color: #008500',
  },
}

const USER_STATE = {
  GUEST: 'Гость',
}

export {
  API,
  WEB_SOCKET,
  CLASS,
  SYSTEM_MESSAGE,
  ERROR,
  LOG,
  SETTING_CONSOLE,
  USER_STATE,
}
