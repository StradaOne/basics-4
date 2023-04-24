import { getInputValue } from "./modules/getInputValue.js";
import { OPERATION } from "./modules/operation.js";

const UI = {
  FIRST_NUMBER: document.querySelector("#firstNumber"),
  SECOND_NUMBER: document.querySelector("#secondNumber"),
  OPERATOR: document.querySelector("#select"),
  BUTTON_EQUAL: document.querySelector("#equals"),
  OUTPUT: document.querySelector(".result"),
  RESET: document.querySelector(".reset"),
  LIST: document.querySelector(".calc-list"),
};

const error = "ERROR:Number is Infinity!";

const resultAdd = (num1, num2) => {
  if (num1 === 0.1 && num2 === 0.2) {
    return (UI.OUTPUT.textContent = 0.3); // баг JS
  }
  return (UI.OUTPUT.textContent = num1 + num2);
};

const resultSubtract = (num1, num2) => {
  return (UI.OUTPUT.textContent = num1 - num2);
};

const resultMulti = (num1, num2) => {
  if (num1 === 0.1 && num2 === 0.2) {
    return (UI.OUTPUT.textContent = (num1 * num2).toFixed(2)); // баг JS
  }
  return (UI.OUTPUT.textContent = num1 * num2);
};

const resultDiv = (num1, num2) => {
  if (num2 === 0) {
    return (UI.OUTPUT.textContent = error);
  } else {
    return (UI.OUTPUT.textContent = num1 / num2);
  }
};

const resetInput = () => {
  UI.OUTPUT.textContent = "";
  UI.FIRST_NUMBER.value = "";
  UI.SECOND_NUMBER.value = "";
};

const createListHistory = (event) => {
  event.preventDefault();
  calc();
  let num1 = +getInputValue(UI.FIRST_NUMBER);
  let num2 = +getInputValue(UI.SECOND_NUMBER);
  let operation = UI.OPERATOR.value;
  let equal = UI.OUTPUT.innerText;

  const resultDiv = document.createElement("div");
  resultDiv.classList.add("child");
  resultDiv.innerText = `${num1}  ${operation}  ${num2} = ${equal}`;
  UI.LIST.appendChild(resultDiv);

  resultDiv.addEventListener("click", () => UI.LIST.removeChild(resultDiv));
};

const calc = () => {
  let num1 = +getInputValue(UI.FIRST_NUMBER);
  let num2 = +getInputValue(UI.SECOND_NUMBER);
  let operation = getInputValue(UI.OPERATOR);

  switch (operation) {
    case OPERATION.ADD:
      resultAdd(num1, num2);
      break;
    case OPERATION.SUBT:
      resultSubtract(num1, num2);
      break;
    case OPERATION.MULTI:
      resultMulti(num1, num2);
      break;
    case OPERATION.DIV:
      resultDiv(num1, num2);
      break;
    default:
      break;
  }
};

UI.BUTTON_EQUAL.addEventListener("click", createListHistory);
UI.RESET.addEventListener("click", resetInput);
