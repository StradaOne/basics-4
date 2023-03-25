function сalc( operation, a, b ) {
  let result = 0;

  switch (operation) {
    case "add":
      result = a + b;
      break;
    case "multi":
      result = a * b;
      break;
    case "subtract":
      result = a - b;
  }

  return result;
}

console.log(сalc("add", 1, 2));
console.log(сalc("multi", 1, 2));
console.log(сalc("subtract", 3, 2));