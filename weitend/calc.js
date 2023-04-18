const form = document.querySelector('.form');
const firstInput = document.querySelector('.form__first-input');
const secondInput = document.querySelector('.form__second-input');
const btn = document.querySelector('.form__btn');
const result = document.querySelector('.result');
const select = document.querySelector('.select')

btn.addEventListener('click', (e) => {
    e.preventDefault();
    result.textContent = checkOperator();
});

function checkOperator() {
    const firstNum = +(firstInput.value);
    const secondNum = +(secondInput.value);

    switch (select.value) {
        case '+':
            return firstNum + secondNum;
            break;
        case '-':
            return firstNum - secondNum;
            break;
        case '*':
            return firstNum * secondNum;
            break;
        case '/':
            return firstNum / secondNum;
            break;

        default:
            break;
    };
};