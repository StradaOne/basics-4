// manipulations
const selectCalc = document.getElementById("select-calc");

const addition = document.getElementById("addition");
const subtraction = document.getElementById("subtraction");
const multiplication = document.getElementById("multiplication");
const division = document.getElementById("division");

// number fields
const firstNumber = document.querySelector(".first-number");
const secondNumber = document.querySelector(".second-number");

// button and output
const equalBtn = document.getElementById("equal");
const outputNumber = document.getElementById("output-number");
const results = document.getElementById("results");

let first, second;
let result;

// ADDITION
function add() {
  if (selectCalc.value === "add") {
    result = first + second;
    outputNumber.textContent = result;

    const newResult = document.createElement("div");
    newResult.textContent = result;
    results.appendChild(newResult);

    // удаление элемента из DOM при клике на него
    newResult.addEventListener("click", () => {
      results.removeChild(newResult);
    });
  }
}

// SUBTRACTION
function sub() {
  if (selectCalc.value === "sub") {
    result = first - second;
    outputNumber.textContent = result;

    const newResult = document.createElement("div");
    newResult.textContent = result;
    results.appendChild(newResult);

    // удаление элемента из DOM при клике на него
    newResult.addEventListener("click", () => {
      results.removeChild(newResult);
    });
  }
}

// MULTIPLICATION
function mult() {
  if (selectCalc.value === "mult") {
    result = first * second;
    outputNumber.textContent = result;

    const newResult = document.createElement("div");
    newResult.textContent = result;
    results.appendChild(newResult);

    // удаление элемента из DOM при клике на него
    newResult.addEventListener("click", () => {
      results.removeChild(newResult);
    });
  }
}

// DIVISION
function div() {
  if (selectCalc.value === "div") {
    result = first / second;
    outputNumber.textContent = result;

    const newResult = document.createElement("div");
    newResult.textContent = result;
    results.appendChild(newResult);

    // удаление элемента из DOM при клике на него
    newResult.addEventListener("click", () => {
      results.removeChild(newResult);
    });
  }
}

// button equal to
equalBtn.addEventListener("click", () => {
  first = Number(firstNumber.value);
  second = Number(secondNumber.value);

  if (selectCalc.value === "add") {
    add();
  } else if (selectCalc.value === "sub") {
    sub();
  } else if (selectCalc.value === "mult") {
    mult();
  } else if (selectCalc.value === "div") {
    div();
  }
});
