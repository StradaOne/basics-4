console.log('test' + 'test');
console.log("test" / 24);
console.log(24 - 24);
console.log(24 + true);
console.log('test' * null);
console.log('test' + undefined);
console.log(NaN / 24);
console.log(NaN - true);
console.log(NaN * null);
console.log(false * 'test');
console.log(false + 'test');
console.log(false - 'test');

let x = new Boolean(0);
console.log(x);


let a = 0;
console.log(Boolean(a));

let b = "0";
console.log(Boolean(b));

let c = new Boolean(null);

if (c) {
    console.log('сработал!');
}

/*Объект Boolean является объектом-обёрткой над примитивом логического типа. Значение, переданное первым параметром, при необходимости преобразуется в логическое значение. Если значение опущено или равно 0, -0, null, false, NaN, undefined или пустой строке (""), объект имеет начальное значение, равное false. Все остальные значения, включая любые объекты или строку "false", создают объект с начальным значением, равным true.*/


console.log(2 > '3');
console.log(2 > NaN);
console.log(2 > undefined);
console.log(undefined === undefined);
console.log(undefined == undefined);
console.log(undefined == NaN);
console.log(NaN == 0);
console.log(undefined == 0);
console.log(null == 0);
console.log(null < 0);
console.log(null > NaN);
console.log(null > undefined);
console.log(null == undefined);
console.log(null === undefined);
console.log(null == 0);
console.log(null === null);
console.log(NaN == undefined);
console.log(undefined < 2);



console.log(5 > 4);
console.log("ананас" > "яблоко");
console.log("2" > "12");
console.log(undefined == null);
console.log(undefined === null);
console.log(null == "\n0\n");
console.log(null === +"\n0\n");


// let age = +prompt('Введите возраст ваш возраст:', '');

// console.log('значение promt равно: ', age);

// if (age >= 14 && age <=90) {
//     alert('Подходишь!');
// } else if (age < 14 && age >= 1) {
//     alert('Мелковат еще, подрасти надо!');
// } else if (age > 90) {
//     alert('Неее, тебе в музей уже пора, староват!');
// } else if (age == 0) {
//     alert('Вы не ввели нормальное число!');
// } else if (age == '' || age == null) {
//     alert('Вы ничего не ввели!');
// } else if (typeof(age) === 'string') {
//     alert('Вы ввели буквы, а надо только цифры!');
// } else if (isNaN(age)) {
//     alert('Ввели белеберду, заного вводите!');
// } else if (age < 0) {
//     alert('Ну какой нафиг ' + age + ', вы в адектавте вообще ?');
// }; 


for (let i = 0; i < 10; i++) {
    setTimeout(function () {
        console.log(i); debugger
    }, 1000); debugger
}
for (var i = 0; i < 10; i++) {
    debugger
    setTimeout(function () {
        console.log(i); debugger
    }, 1000); debugger
}


for (var i = 0; i < 10; i++) {
    (function (i) {
        setTimeout(function () {
            console.log(i);
        }, 1000);
    })(i);
}



// Попробуйте сами:
// Создайте простую функцию калькулятор с именем сalc()
// С тремя параметрами a и b, а также operation
// Вызов сalc(‘add’, 1, 2) - возвращает 3
// Вызов сalc(‘multi’, 1, 2) - возвращает 2
// Вызов сalc(’subtract’, 3, 2) - возвращает 1
// Делить пока ничего не надо.

function calc(a, b, operation) {
    let result = null;

    if (operation == '+') {
        result = a + b;
    } else if (operation == '-') {
        result = a - b;
    } else if (operation == '*') {
        result = a * b;
    } else if (operation == '/') {
        result = 'Это мы еще не проходили';
    }

    return console.log(result);
}


function calc(a, b, operation) {
    let result = null;

    switch (operation) {
        case '+':
            result = a + b;
            break;
        case '-':
            result = a - b;
            break;
        case '*':
            result = a * b;
            break;
        case '/':
            result = a / b;
            break;
    }
    return console.log(result);
}

calc(5, 5, '+');
calc(5, 8, '-');
calc(5, 5, '*');
calc(5, 5, '/');
