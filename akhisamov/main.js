import {elements} from './modules/elements.js'
import {addAnswers} from './modules/addAnswers.js';
import {deleteAnswer} from './modules/deleteAnswer.js';

elements.confirmation.addEventListener('click', calc);
elements.result_history.addEventListener('click', deleteAnswer);

function calc () {
    let a = Number(elements.numberOne.value);
    let b = Number(elements.numberTwo.value);
    let resultInFunc;
    if (isNaN(a) || isNaN(b)) {
        alert('Вводите только числа!')
    } else {
        switch(elements.operation.value) {
            case ('+'):
                resultInFunc = a + b;
                break;
            case ('-'):
                resultInFunc = a - b;
                break;
            case ('*'):
                resultInFunc = a * b;
                break;
            case ('/'):
                if (b === 0) {
                    resultInFunc = 'Нельзя делить на 0!'
                    break;
                } else {
                    resultInFunc = Math.floor((a / b) * 100) / 100;
                    break;
                }
            default:
                resultInFunc = 'Некорректные данные';
        }
    }
    answer(resultInFunc);
    addAnswers(resultInFunc);
}

function answer (item) {
    elements.result.textContent = item;
}