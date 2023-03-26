const operations = {
  add: '+',
  sub: '-',
  multi: '*',
  division: '/',
}

function calc(show, a, b) {
  a = Number(a);
  b = Number(b);

  if (isNaN(a) || isNaN(b)) { 
    return 'Вводите только числа';
  } else switch (show) {
    case operations.add:
      return a + b;
    case operations.sub:
      return a - b;
    case operations.multi:
      return a * b;
    case operations.division: {
      if (b == 0) { 
        console.log("На 0 делить нельзя!");
      } else return a / b;
    }
    default:
      ("Введена неверная операция");
  }
}

console.log(calc(operations.add,3,5));
console.log(calc(operations.division,5,0)); 
console.log(calc(operations.add,10,20)); 
console.log(calc(operations.sub,13,3)); 