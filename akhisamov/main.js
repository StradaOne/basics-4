const elements = {
    numberOne: document.querySelector('#numberOne'),
    operation: document.querySelector('#operation'),
    numberTwo: document.querySelector('#numberTwo'),
    confirmation: document.querySelector('#confirmation'),
    result: document.querySelector('#result'),
}

elements.confirmation.addEventListener('click', calc);

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
    answer(resultInFunc)
}

function answer (item) {
    elements.result.textContent = item;
}