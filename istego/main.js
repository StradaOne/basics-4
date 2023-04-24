import {deleteDiv} from './delete.js';

const resultOut = document.querySelector('.result');
const firstOperand = document.querySelector('.first-operand');
const secondOperand = document.querySelector('.second-operand');
const operation = document.querySelector('select');
const btnEquels = document.querySelector('.equals-btn');
const btnReset = document.querySelector('.reset');
const inputs = document.querySelectorAll('input');
const blockCalc = document.querySelector('.calculator');

let valueFirstOperand = 0;
let valueSecondOperand = 0;
let result = null;


btnEquels.addEventListener('click', validation);
btnReset.addEventListener('click', resetValue);

// Вешаем события на инпуты
inputs.forEach(inp => {
    inp.addEventListener('input', () => {
        valueFirstOperand = Number(firstOperand.value);
        valueSecondOperand = Number(secondOperand.value);
    })
})

// Проверка деления числа на 0 и 0 на 0
function validation() {
    if (valueFirstOperand === 0 && valueSecondOperand === 0 && operation.value === '/') {
        result = '0 на 0 не делят!';
        resultOut.textContent = result;
        return;
    } else if (operation.value === '/' && valueSecondOperand === 0) {
        result = 'На 0 не делят!';
        resultOut.textContent = result;
        return;
    }
    calc();
}

// Выполняем математические операции и выводим
function calc() {
    switch (operation.value) {
        case '+':
            result = valueFirstOperand + valueSecondOperand;
            break;
        case '-':
            result = valueFirstOperand - valueSecondOperand;
            break;
        case '*':
            result = valueFirstOperand * valueSecondOperand;
            break;
        case '/':
            result = valueFirstOperand / valueSecondOperand;
            break;
    }

    resultOut.textContent = result;
    createElemResult(resultOut.textContent);
}

// Создание элемента
function createElemResult(resultInfoText) {
    const resultItem = document.createElement('div');
    resultItem.classList.add('div-result');
    deleteDiv(resultItem);
    resultItem.textContent = resultInfoText;
    addElemenResult(resultItem);
}

// Добавление элемента
function addElemenResult(elemDiv) {
    blockCalc.insertAdjacentElement('afterend', elemDiv);
}

// Сброс всех значенией reset
function resetValue() {
    valueFirstOperand = 0;
    valueSecondOperand = 0;

    firstOperand.value = '';
    secondOperand.value = '';
    resultOut.textContent = 0;
}
