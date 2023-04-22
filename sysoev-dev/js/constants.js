export const OPERATION = {
  ADD: 'add',
  MULTI: 'multi',
  SUBSTRACT: 'substract',
  DIVISION: 'division',
};

export const ERRORS = {
  NUMBER: 'Number Error',
  OPERATION: 'Unknow operation',
};

export const OPERATIONS = {
  add(num1, num2) {
    return num1 + num2;
  },
  multi(num1, num2) {
    return num1 * num2;
  },
  substract(num1, num2) {
    return num1 - num2;
  },
  division(num1, num2) {
    return num1 / num2;
  },
};
