function calc(a, b, operation) {
  if (Number.isNaN(a) || Number.isNaN(b)) {
    return 'Please, enter a number.';
  }
  switch (operation) {
    case 'sum':
      return Number(a) + Number(b);
    case 'min':
      return a - b;
    case 'del':
      return b === 0 ? 'Error' : a / b;
    case 'mul':
      return a * b;
    default:
      return 'Please, choose Operation: sum || min || del || mul.';
  }
}

console.log(calc('3', 2, 'min'));
