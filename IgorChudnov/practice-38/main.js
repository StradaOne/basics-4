let firstNum = document.getElementById('firstNumber');
let secondNum = document.getElementById('secondNumber');
let button = document.getElementById('button');
let summ = document.getElementById('summ');
let subs = document.getElementById('subs');
let mult = document.getElementById('mult');
let divd = document.getElementById('divd');
let result = document.getElementById('result');
let operation;

function makeMath(){
    if (summ.selected) {
        result.innerText = Number(firstNum.value) + Number(secondNum.value);
    };
    if (subs.selected) {
        result.innerText = Number(firstNum.value) - Number(secondNum.value);
    };
    if (mult.selected) {
        result.innerText = Number(firstNum.value) * Number(secondNum.value);
    };
    if (divd.selected) {
        result.innerText = Number(firstNum.value) / Number(secondNum.value);
    };
};


button.addEventListener('click', makeMath);