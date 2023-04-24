import { isNumber } from "./validation.js"

const a = document.querySelector(".operand_a");
const b = document.querySelector(".operand_b");
const operation = document.querySelector(".operation");
const buttonResult = document.querySelector(".button");
const resultOutput = document.querySelector(".result");
const resultsHistory = document.querySelector(".history");

buttonResult.addEventListener("click", rendering);
buttonResult.addEventListener("click", creatingAHistoryOfResults);

function getValueA() {
  return a.value;
}

function getValueB() {
  return b.value;
}

// function isNumber(value) {
//   if (value === "") {
//     alert("Error! Enter a number!");
//     return false;
//   } else {
//     return true;
//   }
// }

function getOperationValue() {
  return operation.value;
}

function calculation() {
  let result;
  let operationValue = getOperationValue();

  if (isNumber(getValueA()) && isNumber(getValueB())) {
    switch (operationValue) {
      case "+":
        result = +getValueA() + +getValueB();
        break;
      case "-":
        result = +getValueA() - +getValueB();
        break;
      case "*":
        result = +getValueA() * +getValueB();
        break;
      case "/":
        result = +getValueA() / +getValueB();
        break;
      default:
        result = false;
    }

    return +result.toFixed(5);
  }
}

let id = 1;

function creatingAHistoryOfResults() {
  const newResult = document.createElement("div");

  newResult.className = `result-${id}`;
  newResult.style.cursor = "pointer";
  newResult.textContent = resultOutput.textContent;

  newResult.addEventListener("click", () => {
    newResult.remove();
  });

  ++id;

  return resultsHistory.appendChild(newResult);
}

function rendering() {
  return (resultOutput.textContent = calculation());
}
