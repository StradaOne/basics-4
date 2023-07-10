import { parseMessage } from './message.js'
import { ERROR, WEB_SOCKET, LOG, SETTING_CONSOLE } from './confing.js'
import { WebSocketError } from './errors.js'

const { URL } = WEB_SOCKET
const { HEADING, COLOR } = SETTING_CONSOLE

let socket = null

const connectWebSocket = (token) => {
  try {
    socket = new WebSocket(`${URL}?${token}`)

    socket.onopen = () => {
      console.info(HEADING.CONNECTED, COLOR.GREEN, LOG.WEB_SOCKET.CONNECTED)
    }

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data)
      parseMessage(data)
    }

    socket.onclose = (event) => {
      if (!event.wasClean) {
        console.error(ERROR.WEB_SOCKET.DISCONECTED)
        connectWebSocket(token)
      }
    }
  } catch (error) {
    if (error instanceof WebSocketError) {
      console.error(`${ERROR.WEB_SOCKET.OTHER} ${error.message}`)
    }
  }
}

const sendMassage = (message) => {
  socket.send(JSON.stringify({ text: message }))
}

const closeWebSocket = () => {
  socket.close()
}

export { connectWebSocket, sendMassage, closeWebSocket }
