function checkAge(age) {
  if (age < 18) {
    console.log("you are not allowed");
  } else {
    console.log("you are welcome!");
  }
}

function Calc(a, b, operation) {
  switch (operation) {
    case "add":
      return a + b;
      break;
    case "subtract":
      return a - b;
      break;
    case "multi":
      return a * b;
      break;

    default:
      return "operation not defined";
      break;
  }
}
console.log(Calc(1, 2, "add"));
console.log(Calc(1, 2, "multi"));
console.log(Calc(3, 2, "subtract"));
console.log(Calc(1, 2, "+"));
