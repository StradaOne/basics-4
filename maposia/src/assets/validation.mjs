import VARIABLES from "./varibles.mjs";
import Cookies from "js-cookie";
import { getUserInfo } from "./fetch.mjs";

function checkSender(name) {
  return name === Cookies.get('')
}

function hasValue(input) {
  if (input.value !== '') {
    return input.value
  }
}

function hasToken() {
  if (Cookies.get('token')) {
    return getUserInfo()
  }
}

function compareToken(token) {

}

function showMessage(input, message, type) {
  const msgNode = input
  msgNode = message;

}

export { checkSender, hasValue }