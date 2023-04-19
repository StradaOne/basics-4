
const run = document.getElementById('equals');
let numbers = document.getElementsByClassName('number');
let result = document.getElementById('result');
let action = document.getElementById('method');
let method = '+';


const ERROR = {
    notNumber: 'You must add two number',
}

function isValid(item){
    if(item === ''){
        alert(ERROR.notNumber)
        return;
    }
    if(isNaN(+item)){
        alert(ERROR.notNumber)
        return;
    }
    return true;
}

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
    }
}

function changeAction(event){
    method = event.target.value;
}

run.addEventListener('click', count)
action.addEventListener('change', changeAction)
