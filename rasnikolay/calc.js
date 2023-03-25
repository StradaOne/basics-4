const ADD = 'add';
const MULTI = 'multi';
const SUBTRACT = 'subtract';
const ERROR = 'This is operation undefined';

function getOperator(operation, firstNumber, secondNumber) {

    let checkNumber = (typeof firstNumber === 'number') && (typeof secondNumber === 'number');

    if (checkNumber) {
        switch (operation) {
            case ADD:
                return firstNumber + secondNumber;
            case MULTI:
                return firstNumber * secondNumber;
            case SUBTRACT:
                return firstNumber - secondNumber;
            default:
                return ERROR;
        }
    } else {
        return 'This is not number';
    }
}

function calc(operator, firstNumber, secondNumber) {
    let result = getOperator(operator, firstNumber, secondNumber);
    console.log(result);
}

calc('add', 3, 3);
calc('multi', 3, 3);
calc('subtract', 3, 3);
calc('error', 3, 3);
calc('add', '3', 3);