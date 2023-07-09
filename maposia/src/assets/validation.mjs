import { VARIABLES } from "./varibles.mjs";
import Cookies from "js-cookie";
import { getUserData } from "./fetch.mjs";
import MESSAGES from "./messages.mjs";

function checkSender(name) {
  return name === Cookies.get('')
}

function hasValue(input) {
  if (input.value.trim() !== '') {
    return true
  }
}

function hasToken() {
  if (Cookies.get('token')) {
    return getUserData()
  }
}

function compareToken(token) {

}

function showMessage(messageNode, message, type) {
  const msgNode = messageNode
  msgNode.textContent = message;

}

function showError(messageNode, message) {
  showMessage(messageNode, message, false)
}


function isCorrectEmail(email) {
  if (email === '') {
    showError(VARIABLES.ELEMENTS.AUTH.MESSAGE, MESSAGES.ERRORS.EMAIL_REQUIRED)
    console.log("emailErr", "Пожалуйста, введите адрес вашей электронной почты");
    return false
  } else {
    // Регулярное выражение для базовой проверки электронной почты
    const regex = /^\S+@\S+\.\S+$/;
    if (regex.test(email.trim()) === false) {
      showError(VARIABLES.ELEMENTS.AUTH.MESSAGE, MESSAGES.ERRORS.EMAIL_INVALID)
      console.log("emailErr", "Пожалуйста, введите действительный адрес электронной почты");
      return false
    } else {
      return true
    }
  }
}

export { checkSender, hasValue, isCorrectEmail }