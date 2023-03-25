const calc = (a = 0, b = 0, operation = '+') => {
  switch (operation) {
    case 'add':
      return a + b;
      break;
    case 'multi':
      return a * b;
      break;
    case 'substract':
      return a - b;
      break;
  
    default:
      return 'Неизвестноx`е значение'
      break;
  } 
}

console.log(calc(1, 2, 'substract'));