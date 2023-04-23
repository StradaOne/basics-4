import { operation } from "./calculatorOperations.js";
import { createSelect } from "./createSelectMathOperator.js";

const content = document.querySelector("body");

const operationList = (value) => {
  const item = document.createElement("li");
  item.textContent = value;
  item.addEventListener("click", () => item.remove());
  return item;
};

const createCalc = () => {
  const calc = document.createElement("div");
  const numOne = document.createElement("input");
  const numTwo = document.createElement("input");
  const action = createSelect();
  const btn = document.createElement("button");
  const sum = document.createElement("div");
  const list = document.createElement("ul");

  calc.classList.add("calc");
  btn.classList.add("btn");
  sum.classList.add("sum");

  btn.textContent = "=";
  btn.addEventListener("click", () => {
    if (
      numOne.value.trim() === "" ||
      (isNaN(+numOne.value.trim()) &&
        (numTwo.value.trim() === "" || isNaN(+numTwo.value.trim())))
    )
      return;

    let result = operation(
      +numOne.value.trim(),
      action.value.trim(),
      +numTwo.value.trim()
    );
    sum.textContent = result;
    list.append(operationList(result));
  });

  numOne.setAttribute("type", "number");
  numTwo.setAttribute("type", "number");

  sum.textContent = 0;

  calc.append(numOne);
  calc.append(action);
  calc.append(numTwo);
  calc.append(btn);
  calc.append(sum);

  content.append(calc);
  content.append(list);
};

createCalc();
