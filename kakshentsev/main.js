const firstInputNumber = document.querySelector(".calculator-num1");
const secondInputNumber = document.querySelector(".calculator-num2");
const mathOperation = document.querySelector("#math-operation");
const buttonForCounting = document.querySelector(".calc_result_btn");
const result = document.querySelector(".calc_result_block");

function clickOnButton() {
  calculation();
}

function calculation() {
  const num1 = +firstInputNumber.value;
  const num2 = +secondInputNumber.value;
  const selectOptions = mathOperation.options[mathOperation.selectedIndex];
  const operation = selectOptions.value;

  result.textContent = performMathOperation(operation, num1, num2);
}

function performMathOperation(operation, operand1, operand2) {
  let result = 0;
  switch (operation) {
    case "addition":
      result = (operand1 + operand2).toFixed(1);
      break;
    case "subtraction":
      result = operand1 - operand2;
      break;
    case "multiplication":
      result = operand1 * operand2;
      break;
    case "division":
      result = operand1 / operand2;
      break;
    default:
      alert("You've used incorrect math operation");
  }
  return result;
}

buttonForCounting.addEventListener("click", clickOnButton);
