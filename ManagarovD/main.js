/*
    Создайте простую функцию калькулятор с именем сalc()
    С тремя параметрами a и b, а также operation
    Вызов сalc(‘add’, 1, 2) - возвращает 3
    Вызов сalc(‘multi’, 1, 2) - возвращает 2
    Вызов сalc(’subtract’, 3, 2) - возвращает 1
*/


const ADD = 'add';
const MULTI = 'multu';
const SUBTRACT = 'subtract';

function calc (operator,a,b) {
    if (typeof(a) != 'number' || typeof(b) != 'number') {
        return false;
    }
    switch (operator) {
        case ADD: return a+b;
        case MULTI: return a*b;
        case SUBTRACT: return a-b;
        default: return false;
    }
}

console.log('calc(ADD,5,6) возвратил ' + calc(ADD,5,6));
console.log('calc(MULTI,2,5) возвратил ' + calc(MULTI,2,5));
console.log('calc(SUBTRACT,6,6) возвратил ' + calc(SUBTRACT,6,6));
console.log('calc(SUBTRACT,6,"5") возвратил ' + calc(SUBTRACT,6,"5"));