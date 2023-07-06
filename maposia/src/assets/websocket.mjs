import Cookies from "js-cookie";
import { newMessageHandler } from "./handlers.mjs";

let socket

function setupWebSocket() {
  const userToken = Cookies.get('token')
  socket = new WebSocket(`wss://edu.strada.one/websockets?${userToken}`);
  socket.onopen = () => {
    console.log('WebSocket connection established.');
    socket.onmessage = newMessageHandler
  };
  socket.onclose = () => {
    console.log('WebSocket was closed.');
  }
  return socket
}


export { setupWebSocket, socket }
