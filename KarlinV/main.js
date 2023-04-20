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

  const createCalc = () => {
    const calc = document.createElement("div");
    const numOne = document.createElement("input");
    const numTwo = document.createElement("input");
    const action = createSelect();
    const btn = document.createElement("button");
    const sum = document.createElement("div");

    calc.classList.add("calc");
    btn.classList.add("btn");
    sum.classList.add("sum");

    btn.textContent = "=";

    numOne.value = 5;
    numTwo.value = 5;

    sum.textContent = +numOne.value + +numTwo.value;

    calc.append(numOne);
    calc.append(action);
    calc.append(numTwo);
    calc.append(btn);
    calc.append(sum);

    content.append(calc);
  };

  createCalc();
})();
