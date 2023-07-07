import { parseMessage } from './logic.js'

let socket = null

const createWebSocket = (token) => {
  let url = 'wss://edu.strada.one/websockets'
  socket = new WebSocket(`${url}?${token}`)

  socket.onopen = () => {
    console.log('[open] Соединение установлено')
  }

  socket.onmessage = (event) => {
    console.log(`[message] Данные получены с сервера: ${event.data}`)
    const data = JSON.parse(event.data)
    parseMessage(data)
  }

  socket.onclose = (event) => {
    if (event.wasClean) {
      console.log(
        `Соединение закрыто без ошибок, код: ${event.code}, причина: ${event.reason}`
      )
    }

    if (!event.wasClean) {
      console.log(`Соединение закрыто принудительно, либо произошла ошибка`)
    }
  }

  socket.onerror = (error) => {
    console.log(`Ошибка: ${error}`)
  }
}

const updateWebSocket = (message) => {
  socket.send(JSON.stringify({ text: message }))
}

const closeWebSocket = () => {
  socket.close()
}

export { createWebSocket, updateWebSocket, closeWebSocket }
