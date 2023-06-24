function calc (operation, a, b) {
  switch (operation) {
    case 'add':
      return a + b;

    case 'multi':
      return a * b;

    case 'substract':
      return a - b;

    default:
      break;
  }
}

calc ('add', 1, 2);