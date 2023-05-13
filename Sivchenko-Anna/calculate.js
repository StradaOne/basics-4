import {
  addResult,
  operator,
  firstOperand,
  secondOperand,
} from "./main.js";

export let result;

export function calculate() {
  switch (operator.value) {
    case "+":
      result = +firstOperand.value + +secondOperand.value;
      addResult();
      break;
    case "-":
      result = +firstOperand.value - +secondOperand.value;
      addResult();
      break;
    case "*":
      result = +firstOperand.value * +secondOperand.value;
      addResult();
      break;
    case "/":
      result = +firstOperand.value / +secondOperand.value;
      addResult();
      break;
  }
}
