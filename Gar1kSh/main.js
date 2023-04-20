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
