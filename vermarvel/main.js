// Variables
const input = document.getElementById("display");
// Input Numbers
const btn1 = document.getElementById("btn-1");
const btn2 = document.getElementById("btn-2");
const btn3 = document.getElementById("btn-3");
const btn4 = document.getElementById("btn-4");
const btn5 = document.getElementById("btn-5");
const btn6 = document.getElementById("btn-6");
const btn7 = document.getElementById("btn-7");
const btn8 = document.getElementById("btn-8");
const btn9 = document.getElementById("btn-9");
const btn0 = document.getElementById("btn-0");
const dot = document.getElementById("dot");
// Iterables
const buttons = document.getElementsByClassName("num");
const operations = document.getElementsByClassName("operation");
// Input Operations
const plus = document.getElementById("plus");
const minus = document.getElementById("minus");
const neg = document.getElementById("neg");
const divide = document.getElementById("divide");
const multiply = document.getElementById("multiply");
const clear = document.getElementById("c");
const equal = document.getElementById("equal");

// Helper functions&variables
const empty = "";
const errorZero = "Can't divide by zero";
const errorData = "insufficient data";
// Start
function start() {
  input.value = empty;
}

// Data keeper, calculation method
const data = {
  a: "",
  b: "",
  op: "",

  calc(a, b, op) {
    //Guard clause
    if (b == 0 && op === "/") return errorZero;
    if (a === empty || b === empty) return errorData;
    // calculator
    if (op === "-") return parseFloat(a) - parseFloat(b);
    if (op === "+") return parseFloat(a) + parseFloat(b);
    if (op === "/") return parseFloat(a) / parseFloat(b);
    if (op === "*") return parseFloat(a) * parseFloat(b);
  },
};

// Event Listeners
// numbers
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function () {
    if (
      input.value.startsWith("0") &&
      input.value !== "0" &&
      !input.value.includes(".")
    ) {
      if (this.value !== "0") {
        input.value = input.value.slice(1);
      }
    }
    if (input.value === "0") {
      input.value = this.value;
    }
    if (input.value === errorData || input.value === errorZero)
      input.value = this.value;
    else {
      input.value += this.value;
    }
  });
}
// Dot
dot.addEventListener("click", function () {
  if (!input.value.includes(this.value)) {
    if (input.value === empty) {
      input.value = "0" + this.value;
    } else {
      input.value += this.value;
    }
  }
});

// Zero
btn0.addEventListener("click", function () {
  if (input.value === "0") {
    return;
  }
  if (input.value.startsWith("0") && input.value.length > 0) {
    return;
  }
  if (input.value === empty) {
    input.value = this.value;
  } else {
    input.value += this.value;
  }
});

//operations

for (let i = 0; i < operations.length; i++) {
  operations[i].addEventListener("click", function () {
    // saving a and op
    data.a = input.value;
    data.op = this.value;
    //clear
    input.value = empty;
  });
}

// equal
equal.addEventListener("click", function () {
  // saving b
  data.b = input.value;

  // calc
  input.value = data.calc(data.a, data.b, data.op);
  // reset
  data.a = empty;
  data.b = empty;
  data.op = empty;
});

// clear

clear.addEventListener("click", start);

// negatives

neg.addEventListener("click", function () {
  if (input.value === "-") {
    return;
  }
  if (data.a !== empty) {
    data.b = data.b * -1;
    input.value += "-";
  } else {
    data.a = data.a * -1;
    input.value = "-";
  }
});
