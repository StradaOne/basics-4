(function () {
  const content = document.querySelector("body");
  const createSelect = () => {
    const options = ["+", "-", "*", "/"];
    const action = document.createElement("select");

    action.classList.add("action");

    for (let i = 0; i < options.length; i++) {
      const optionEl = document.createElement("option");
      const element = options[i];

      optionEl.value = element;
      optionEl.textContent = element;

      action.append(optionEl);
    }

    return action;
  };

  const operationList = (value) => {
    const item = document.createElement("li");
    item.textContent = value;
    item.addEventListener("click", () => item.remove());
    return item;
  };

  const operation = (valueOne, operator, valueTwo) => {
    let result = null;

    switch (operator) {
      case "+":
        result = valueOne + valueTwo;
        break;
      case "-":
        result = valueOne - valueTwo;
        break;
      case "*":
        result = valueOne * valueTwo;
        break;
      case "/":
        result = valueTwo === 0 ? "#ДЕЛ/0" : valueOne / valueTwo;
        break;
    }
    return result;
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
    numOne.setAttribute("required", "");
    numTwo.setAttribute("type", "number");
    numTwo.setAttribute("required", "");

    numOne.value = 5;
    numTwo.value = 5;

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
})();
