const OPERATION = {
  ADD: 'add',
  MULTI: 'multi',
  SUBSTRACT: 'substract',
};

const OPERATIONS = {
  add(num1, num2) {
    return Number(num1) + Number(num2);
  },
  multi(num1, num2) {
    return Number(num1) * Number(num2);
  },
  substract(num1, num2) {
    return Number(num1) - Number(num2);
  },
};

const ERROR_NUMBER_MESSAGE = 'Number Error';
const ERROR_OPERATION_MESSAGE = 'Unknow operation';

function isNumber(num) {
  return Number.isFinite(num);
}

function calc(num1, num2, operation) {
  const isValid = isNumber(num1) && isNumber(num2);

  if (!isValid) {
    return ERROR_NUMBER_MESSAGE;
  }

  switch (operation) {
    case OPERATION.ADD:
      return OPERATIONS.add(num1, num2);
    case OPERATION.MULTI:
      return OPERATIONS.multi(num1, num2);
    case OPERATION.SUBSTRACT:
      return OPERATIONS.substract(num1, num2);
    default:
      return ERROR_OPERATION_MESSAGE;
  }
}

console.log(calc(3, 4, OPERATION.ADD));
console.log(calc(5, 5, OPERATION.MULTI));
console.log(calc(25, 10, OPERATION.SUBSTRACT));
console.log(calc(3, '4', OPERATION.ADD));
console.log(calc(5, 5, 'plus'));
console.log(calc('5five', 5, 'plus'));
