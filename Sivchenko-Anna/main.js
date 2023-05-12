const firstOperand = document.querySelector(".js-operand-a");
const secondOperand = document.querySelector(".js-operand-b");
const operator = document.querySelector(".js-select-operation");
const btnResult = document.querySelector(".js-btn-result");
const outPut = document.querySelector(".js-output");

function calculate () {
  let result;
  switch (operator.value) {
    case "+":
      result = +firstOperand.value + +secondOperand.value;
      outPut.textContent = result;
      break;
    case "-":
      result = +firstOperand.value - +secondOperand.value;
      outPut.textContent = result;
      break;
    case "*":
      result = +firstOperand.value * +secondOperand.value;
      outPut.textContent = result;
      break;
    case "/":
      if (secondOperand.value === '0') {
        outPut.textContent = "Делить на 0 нельзя!"
        break
      } else {
        result = +firstOperand.value / +secondOperand.value;
        outPut.textContent = result;
        break;
      }
  }
}

btnResult.addEventListener('click', calculate);