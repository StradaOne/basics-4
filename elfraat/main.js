const ADD = '+';
const MULTI = '*';
const SUBTRACT = '-';

function calc(operation, a, b){
    switch (operation){
        case ADD:
            console.log(Number(a) + Number(b));
            return;
        case MULTI:
            console.log(Number(a) * Number(b));
            return;
        case SUBTRACT:
            console.log(Number(a) - Number(b));
            return;
        default:
            console.log('Некорректная операция')
    }
}

calc(ADD , 25, 34);
calc(MULTI, 37, 49);
calc(SUBTRACT, 23333, 1279);
calc('ad', 2, 50);
calc(ADD, '22','45');
calc(MULTI, 'qwe', 'qq');
