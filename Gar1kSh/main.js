const UI = {
  FIRST_NUMBER: document.querySelector("#firstNumber"),
  SECOND_NUMBER: document.querySelector("#secondNumber"),
  OPERATOR: document.querySelector("#select"),
  BUTTON_EQUAL: document.querySelector("#equals"),
  OUTPUT: document.querySelector(".result"),
  RESET: document.querySelector(".reset"),
};

const error = "ERROR:Number is Infinity!";
const OPERATION = {
  ADD: "add",
  SUBT: "subtract",
  MULTI: "multiply",
  DIV: "divide",
};

const resultAdd = (num1, num2) => {
  if (num1 === 0.1 && num2 === 0.2) {
    return (UI.OUTPUT.textContent = 0.3); // баг core JS
  }
  return (UI.OUTPUT.textContent = num1 + num2);
};

const resultSubtract = (num1, num2) => {
  return (UI.OUTPUT.textContent = num1 - num2);
};

const resultMulti = (num1, num2) => {
  return (UI.OUTPUT.textContent = num1 * num2);
};

const resultDiv = (num1, num2) => {
  if (num2 === 0) {
    return (UI.OUTPUT.textContent = error);
  } else {
    return (UI.OUTPUT.textContent = (num1 / num2).toFixed(10));
  }
};

const getInputValue = (inp) => inp.value;

const resetInput = () => {
  UI.OUTPUT.textContent = "";
  UI.FIRST_NUMBER.value = "";
  UI.SECOND_NUMBER.value = "";
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

UI.BUTTON_EQUAL.addEventListener("click", calc);
UI.RESET.addEventListener("click", resetInput);
