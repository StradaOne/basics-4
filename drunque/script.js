function calc(a, b, operation) {
  const operations = {
    add: a + b,
    sub: a - b,
    mul: a * b,
    div: a / b,
  };

  const validation = {
    isValidOperation: Object.keys(operations).includes(operation),

    isValidNumbers(...numbers) {
      return numbers.filter(Number.isFinite).length === numbers.length;
    },
  };

  if (validation.isValidNumbers(a, b) && validation.isValidOperation) {
    let result = operations[operation];

    if (!Number.isFinite(result)) return "Error";
    
    if (!Number.isInteger(result)) {
      result = result.toFixed(2);
    }

    return result.toString().slice(0, 30);
  }
  return "Error";
}

const resultButton = document.querySelector("#result-button");
resultButton.addEventListener("click", () => {
  const numberNodes = Array.from(document.querySelectorAll("input"));
  const numbers = numberNodes.map((node) => Number.parseFloat(node.value) );

  const operation = document.querySelector(".current div").dataset.value;
  const result = calc(...numbers, operation);
  const resultNode = document.querySelector("#result");

  if (result) resultNode.textContent = result;
});
