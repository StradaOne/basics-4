function calc(operation, a, b) {
  switch (operation) {
    case "add":
      return a + b;
    case "multi":
      return a * b;
    case "subtract":
      return a - b;
    default:
      return "Ошибка";
  }
}

console.log(calc("add", 3, 5));
console.log(calc("multi", 4, 66));
console.log(calc("subtract", 55, 43));
console.log(calc("f", 55, 43));
