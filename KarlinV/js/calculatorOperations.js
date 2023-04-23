export const operation = (valueOne, operator, valueTwo) => {
  if (valueTwo === 0 && operator === "/") {
    return "#ДЕЛ/0";
  }

  switch (operator) {
    case "+":
      return valueOne + valueTwo;
    case "-":
      return valueOne - valueTwo;
    case "*":
      return valueOne * valueTwo;
    case "/":
      return valueOne / valueTwo;
    default:
      return null;
  }
};
