import VARIABLES from "./varibles.mjs";
import Cookies from "js-cookie";

function checkSender(name) {
  return name === Cookies.get('')
}

function hasValue(input) {
  if (input.value !== '') {
    return input.value
  }
}

// function showMessage(input, message, type) {
//   const msgNode = input
//   msgNode = message;
//
// }

export { checkSender, hasValue }