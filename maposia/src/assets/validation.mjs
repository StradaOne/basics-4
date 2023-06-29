import VARIABLES from "./varibles.mjs";

function checkSender() {
  return !!VARIABLES.ELEMENTS.CHAT_INPUT.value
}

export default checkSender