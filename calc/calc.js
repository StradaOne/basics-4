const ERR_TEXT = "arithmetic operations are invalid, check the entered data";

const calc = (operation, a, b) => {
  if (isNaN(a) || isNaN(b)) return console.log(ERR_TEXT);

  switch (operation) {
    case "add":
      console.log(a + b);
      break;

    case "multi":
      console.log(a * b);
      break;

    case "subtract":
      console.log(a - b);
      break;

    default:
      console.log(ERR_TEXT);
  }
};

calc("add", 1, 2);
calc("multi", 1, 2);
calc("subtract", 3, 2);
