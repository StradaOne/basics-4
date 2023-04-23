const firstNum = document.querySelector('.firstNum');
const secondNum = document.querySelector('.secondNum');
const select = document.querySelector('.select');
const btnEqual = document.querySelector('.btn-equal');
const calcResult = document.querySelector('.calc-result');
const calcList = document.querySelector('.calc-list')

function calc() {
    let result = null;
    const num_1 = +firstNum.value;
    const num_2 = +secondNum.value;
    const operation = select.value;
    
    switch(operation){
        case '+':
            result = num_1 + num_2;
            break;
        case '-':
            result = num_1 - num_2;
            break;
        case '*':
            result = num_1 * num_2;
            break;
        case '/':
            result = num_1 / num_2;
            break;
        default:
            alert('Что-то не так');
    }
    return result;
}

btnEqual.addEventListener('click', function (){
    result = calc();
    calcResult.textContent = result;
    const newDiv = document.createElement('div');
    newDiv.classList.add("child")
    newDiv.textContent = calcResult.textContent;
    calcList.appendChild(newDiv);
    newDiv.addEventListener('click',() => calcList.removeChild(newDiv))
});