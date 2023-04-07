function calc(operation, a, b) {
  switch (operation) {
    case "add":
      return a + b;
    case "subtract":
      return a - b;
    case "multi":
      return a * b;
    default:
      return "Invalid input"
  }
}

function calc2(operation, a, b) {
  const operations = {
    add: a + b,
    subtract: a - b,
    multi: a * b,
  };
  return operations[operation] || "Invalid input";
}

console.log(calc("add", 1, 2), calc("multi", 1, 2), calc("subtract", 3, 2)); // 3 2 1
console.log(calc2("add", 1, 2), calc2("multi", 1, 2), calc2("subtract", 3, 2)); // 3 2 1

console.log(calc("bee", 2, 3)) // Invalid input
console.log(calc2('dude', 2, 44)) // Invalid input