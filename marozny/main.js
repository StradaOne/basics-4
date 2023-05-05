import { DIVIDE, MINUS, MULTI, PLUS, buttons, firstValue, operations, resultsField, secondValue } from "./utils.js";
let result;

function calculation(number1, number2, operation) {
    try {
    if (Number.isNaN(number1) && Number.isNaN(number2)) {
   switch (operation) {
    case PLUS:
        sum(number1, number2);
        break;
    case MINUS:
        sub(number1, number2);
        break;
    case MULTI:
        multi(number1, number2);
        break;
    case DIVIDE:
        divide(number1, number2);
        break;
   } 
  }
 } catch(err) { 
    alert(err.message + " in " + err.name);
}
   showUI(result);
}

function showUI(result) {
    const newChild = document.createElement('div');
    newChild.textContent = result;
    resultsField.insertAdjacentElement('beforeend', newChild);
    resultsField.addEventListener('click', (event) => {
        event.target.remove();
        event.target.removeEventListener;
    });
}

function sum(number1, number2) {
    return result = number1 + number2;
}

function sub(number1, number2) {
    return result = number1 - number2;
}

function multi(number1, number2) {
    return result = number1 * number2;
}

function divide(number1, number2) {
    return result = number1 / number2;
}

buttons.addEventListener('click', () => {
    let number1 = Number(firstValue.value);
    let number2 = Number(secondValue.value);
    let operation = operations.value;
    calculation(number1, number2, operation);
                                        });
