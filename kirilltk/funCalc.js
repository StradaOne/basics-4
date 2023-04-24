const conteinerForAnswers = document.querySelector('#answers');

import { countNumbers } from './main.js';
export function calc() {
    let symbol = document.getElementById('operation');
    let selectOperator =  symbol.value;
    let firstNumber = document.getElementById('first_number').value;
    let secondNumber = document.getElementById('second_number').value;
    document.getElementById('result').innerHTML = countNumbers(selectOperator, Number(firstNumber), Number(secondNumber));
    const newElement = document.createElement('div');
    newElement.textContent = `${countNumbers(selectOperator, Number(firstNumber), Number(secondNumber))}`;
    conteinerForAnswers.appendChild(newElement);
    newElement.addEventListener('click', (event) => event.target.remove());
};