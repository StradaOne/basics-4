const ERROR_MESSAGE = 'Ошибка'
function calc(operation, a, b) {
  if (typeof(a) !== 'number') {
    return 'введите числа';
  } else if (typeof(b) !== 'number') {
    return 'введите числа';
  }
 
  
  if (operation === 'add') {
    return a + b;
  } else if (operation === 'subtract') {
    return a - b;
  } else if (operation === 'multi') {
    return a * b;
  } else {
    return ERROR_MESSAGE;
  }
}

console.log(calc('add', 2, 4));
console.log(calc('add', '2s', 4));
console.log(calc('multi', 2, '4s'));
console.log(calc('mdulti', 2, '4s'));
console.log(calc('subtract', 22, 2));



