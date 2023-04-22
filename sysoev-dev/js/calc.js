import { OPERATION, OPERATIONS, ERRORS } from '../js/constants.js';

export function calc(num1, num2, operation) {
  switch (operation) {
    case OPERATION.ADD:
      return OPERATIONS.add(num1, num2);
    case OPERATION.MULTI:
      return OPERATIONS.multi(num1, num2);
    case OPERATION.SUBSTRACT:
      return OPERATIONS.substract(num1, num2);
    case OPERATION.DIVISION:
      return OPERATIONS.division(num1, num2);
    default:
      alert(ERRORS.OPERATION);
      break;
  }
}
