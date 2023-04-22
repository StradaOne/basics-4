import dom from "./dom.js";

// Variables

let curResult;

// *******Logics********

// Start
function start() {
  dom.input.value = dom.empty;
}

// Reset

function resetKeeper() {
  data.a = dom.empty;
  data.b = dom.empty;
  data.op = dom.empty;
}

// Create a result on the history screen
function createResult() {
  if (dom.input.value === dom.errorData || dom.input.value === dom.errorZero)
    return;

  const newResult = document.createElement("div");
  const resultValue = document.createTextNode(curResult);
  const newBin = document.createElement("div");
  newBin.innerHTML = `&#x1F5D1`;

  // Set an id
  newBin.dataset.index = dom.resultsScr.childElementCount;
  if (newBin.dataset.index > 8) return;

  // Produce a result
  dom.resultsScr.appendChild(newResult);
  newResult.classList.add("result");
  newResult.appendChild(resultValue);
  // Produce a bin
  dom.binsScr.appendChild(newBin);
  newBin.classList.add("bin");
  // Button Clear history -> vsible
  dom.btnClearResults.classList.remove("hidden");
}

// Delete All
function deleteAll() {
  const history = document.querySelectorAll(`.result`);
  const allBins = document.querySelectorAll(`.bin`);

  history.forEach((result) => {
    result.remove();
  });
  allBins.forEach((bin) => {
    bin.remove();
  });
  // Button Clear history -> invsible
  dom.btnClearResults.classList.add("hidden");
}

// Data keeper, calculation method
const data = {
  a: "",
  b: "",
  op: "",

  calc(a, b, op) {
    //Guard clause
    if (b == 0 && op === "/") return dom.errorZero;
    if (a === dom.empty || b === dom.empty) return dom.errorData;
    // calculate
    if (op === "-") return parseFloat(a) - parseFloat(b);
    if (op === "+") return parseFloat(a) + parseFloat(b);
    if (op === "/") return parseFloat(a) / parseFloat(b);
    if (op === "*") return parseFloat(a) * parseFloat(b);
  },
};

// %%%%%%%  Events  %%%%%%%%%%

//***** Calculator*******
// numbers + operations
// Event Delegation implemented
dom.numbersParent.addEventListener("click", function (event) {
  const target = event.target;
  if (target.classList.contains("num")) {
    if (
      dom.input.value.startsWith("0") &&
      dom.input.value !== "0" &&
      !dom.input.value.includes(".")
    ) {
      if (target.value !== "0") {
        dom.input.value = dom.input.value.slice(1);
      }
    }
    if (dom.input.value === "0") {
      dom.input.value = target.value;
    }
    if (dom.input.value == dom.errorData || dom.input.value == dom.errorZero)
      dom.input.value = target.value;
    else {
      dom.input.value += target.value;
    }
  }
  // Operations
  if (target.classList.contains("operation")) {
    if (dom.input.value === dom.empty) return;

    if (dom.input.value == dom.errorData || dom.input.value == dom.errorData) {
      start();
    }
    if (data.op !== dom.empty) {
      dom.input.value = dom.errorData;
      return resetKeeper();
    }

    if (data.a === dom.empty && data.op === dom.empty) {
      // saving a and op
      data.a = dom.input.value;
      data.op = target.value;
      //clear
      start();
    }
  }
});

// Dot

dot.addEventListener("click", function () {
  if (!dom.input.value.includes(this.value)) {
    if (dom.input.value === dom.empty) {
      dom.input.value = "0" + this.value;
    } else {
      dom.input.value += this.value;
    }
  }
});

// Zero
dom.btn0.addEventListener("click", function () {
  if (dom.input.value === "0") {
    return;
  }
  if (dom.input.value.startsWith("0") && dom.input.value.length > 0) {
    return;
  }
  if (dom.input.value === dom.empty) {
    dom.input.value = this.value;
  } else {
    dom.input.value += this.value;
  }
});

// equal + clear
// Event Delegation implemented
dom.row.addEventListener("click", function (event) {
  const target = event.target;
  if (target.classList.contains("equal")) {
    if (dom.input.value === dom.empty) return;
    // saving b
    data.b = dom.input.value;

    // calc
    curResult = data.calc(data.a, data.b, data.op);
    if (isNaN(curResult)) {
      dom.input.value = dom.errorData;
      resetKeeper();
    } else {
      dom.input.value = curResult;
      createResult();
      resetKeeper();
    }
  }

  if (target.classList.contains("clear")) {
    // clear button for display

    dom.clear.addEventListener("click", start);
  }
});

// negatives

dom.neg.addEventListener("click", function () {
  if (dom.input.value === "-") return;
  if (data.a !== dom.empty) {
    data.b = data.b * -1;
    dom.input.value += "-";
  } else {
    data.a = data.a * -1;
    dom.input.value = "-";
  }
});

//***** History*******

// clear button for history
dom.btnClearResults.addEventListener("click", deleteAll);

// Clear a single result + bin icon
dom.binsScr.addEventListener("click", function (event) {
  // check for .bin class

  if (event.target.classList.contains("bin")) {
    // Find the corresponding result element and remove it

    const index = event.target.dataset.index;
    console.log(index);
    const result = dom.resultsScr.children[index];
    result.remove();

    // Remove the bin icon
    event.target.remove();

    // Button Clear history -> invsible (if applicable)
    dom.binsScr.childNodes.length < 2
      ? dom.btnClearResults.classList.add("hidden")
      : "";
  }
});
