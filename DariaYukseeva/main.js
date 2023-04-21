
const btnEqual = document.querySelector('.btn');
const outResult = document.querySelector('.out');
const btnReset = document.querySelector('.reset');
const resultsCache = document.querySelector('.resultsCache');

let out = '';
const mistakeMessage = 'Mistake!';

function calculate(operation, a, b) {
    if (isNumber(a) && isNumber(b)) {
        switch (operation) {
            case "+":
                return out = a + b;
            case "*":
                return out = a * b;
            case "-":
                return out = a - b;
            case "/":
                if (b !== 0) {
                return out = a / b;
                }
                else {
                    out = mistakeMessage;
                }
            default:
                out = mistakeMessage;
                return null;
        }
    }
    else {
        out = mistakeMessage;
        return null;
    }
}

function isNumber(value) {
    return typeof value === 'number' && !isNaN(value);
}

function getInputValue(sel) {
    return document.querySelector(sel).value;
}

btnEqual.addEventListener('click', function() {
    let number1 = +getInputValue('.num1').replace(/,/i, '.');
    let number2 = +getInputValue('.num2').replace(/,/i, '.');
    let selectedMathOperator = getInputValue('#operator');
    calculate(selectedMathOperator, number1, number2);
    outResult.innerHTML = out;

    resultsCache.insertAdjacentHTML('beforeend', `<div class="result-item">${number1}${selectedMathOperator}${number2} = ${out}</div>`);
});
btnReset.addEventListener('click', function() {
 
    document.querySelector('.num1').value = '';
    document.querySelector('.num2').value = '';
    out = '';
    outResult.innerHTML = out;
})

resultsCache.addEventListener('click', function(event) {
    if (event.target.classList.contains('result-item')) {
        event.stopPropagation();
        event.target.remove();
    }
    
})