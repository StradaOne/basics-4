import {
    btnCalc,
    ADD,
    MULTI,
    SUBTRACT,
    DIVISION,
    ERROR,
    getInputValue
} from './constCalc.js';

console.log(btnCalc);

btnCalc.addEventListener('click', calc);

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
            case DIVISION:
                return firstNumber / secondNumber;
            default:
                return ERROR;
        }
    } else {
        return 'This is not number';
    }
}

function calc(event) {
    event.preventDefault();
    console.log(event);
    const firstNumberDOM = +getInputValue(".first_number");
    console.log(firstNumberDOM);
    const secondNumberDOM = +getInputValue(".second_number");
    const operationDOM = getInputValue("#operation");
    console.log(operationDOM);

    let result = getOperator(operationDOM, firstNumberDOM, secondNumberDOM);
    console.log(result);
    document.body.querySelector(".result").textContent = result;

    const conclusion = document.querySelector(".conclusion");
    const newConclusion = document.createElement('div');
    newConclusion.textContent = result;
    conclusion.appendChild(newConclusion);
    newConclusion.addEventListener('click', () => {
        conclusion.removeChild(newConclusion);
    })
}


