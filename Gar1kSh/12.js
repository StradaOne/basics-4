const errorOperation = "Error. Invalid data type.";
function calc(operation, a, b) {
  switch (operation) {
    case "add":
      return a + b;
    case "substruct":
      return a - b;
    case "multi":
      return a * b;
    default:
      return errorOperation;
  }
}

console.log(calc("multi", 2, 6));
console.log(calc("add", 5, 4));
console.log(calc("substruct", 8, -4));
console.log(calc("ad", 2, 3));
