import { format } from 'date-fns'
import VARIABLES from "./varibles.mjs";

function currentTime() {
  const time = new Date()
  const formatTime = format(time, 'HH:mm')
  return formatTime
}

function scrollChat() {
  const chatWindow = VARIABLES.ELEMENTS.MESSAGES_NODE
  const xH = chatWindow.scrollHeight;
  chatWindow.scrollTo(0, xH);
}

export { currentTime, scrollChat }