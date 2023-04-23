const count = document.getElementById('buttonEquals');
const conteinerForAnswers = document.querySelector('#answers')

function countNumbers(operator, first, second) {
    if (isNaN(first) || isNaN(second)) {
        return 'Что-то из введенного не число!';
    } else {
        switch(operator) {
            case '+':
                if (first < 1 && second < 1) {return first + second} else {return (first + second).toFixed(8)};
            case '-':
                return first - second;
            case '*':
                if (first < 1 && second < 1) {return first * second} else {return (first * second).toFixed(8)};
            case '/':
                if (second == 0) {
                    return 'На ноль делить нельзя';
                } else {
                    if (first%second === 0) {return first / second} else {return (first / second).toFixed(8)};
                }
        }
    };
};


function calc() {
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

count.addEventListener('click', calc);

