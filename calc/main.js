import { isValid } from "./validation.js";

const run = document.getElementById('equals');
let numbers = document.getElementsByClassName('number');
let result = document.getElementById('result');
let action = document.getElementById('method');
let method = '+';
const results = document.querySelector('.results');

function addition(num1, num2){
    return num1 + num2;
}

function subtraction(num1, num2){
    return num1 - num2;
}

function multiplication(num1, num2){
    return num1 * num2;
}

function division(num1, num2){
    return num1 / num2;
}

function showResult(res){
    result.textContent = res;
}

function createResultElement(res){
    const newResultElement = document.createElement('div');
    newResultElement.className = 'new-result';
    newResultElement.textContent = res;
    return newResultElement;
}

function writheResult(res){
   const myResult = createResultElement(res)
   results.appendChild(myResult)
}

function count (event){
    event.preventDefault()
    if(isValid(numbers[0].value) && isValid(numbers[1].value)){
        let num1 = +numbers[0].value;
        let num2 = +numbers[1].value;
        let res;
        if(method === '+'){
            res = addition(num1, num2);
        }
        if(method === '-'){
            res = subtraction(num1, num2);
        }
        if(method === '*'){
            res = multiplication(num1, num2);
        }
        if(method === '/'){
            res = division(num1, num2);
        }
        showResult(res)
        writheResult(res)
    }
}

function changeAction(event){
    method = event.target.value;
}

function remuveElement(event){
    event.target.remove()
}

run.addEventListener('click', count)
action.addEventListener('change', changeAction)
results.addEventListener('click', remuveElement)
