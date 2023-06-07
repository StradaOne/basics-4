const firstOperand = document.querySelector(".js-operand-a");
const secondOperand = document.querySelector(".js-operand-b");
const operator = document.querySelector(".js-select-operation");
const btnResult = document.querySelector(".js-btn-result");
const output = document.querySelector(".js-output");

let result;

function calculate () {
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

function addResult () {
  const newOutputDiv = document.createElement("div");
  if (result === Infinity || result === -Infinity) {
    newOutputDiv.textContent = "Делить на 0 нельзя!";
  } else {
    newOutputDiv.textContent = result;
  }
  output.insertAdjacentElement("afterbegin", newOutputDiv);
}

btnResult.addEventListener('click', calculate);

output.addEventListener('click', (event) => {
  event.target.remove();
})