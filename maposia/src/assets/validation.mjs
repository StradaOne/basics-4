import VARIABLES from "./varibles.mjs";

function iSender() {
  return !!VARIABLES.ELEMENTS.CHAT_INPUT.value
}

// function hasValue(input) {
//   if (input.value !== '') {
//     return input.value
//   }
// }

export default iSender