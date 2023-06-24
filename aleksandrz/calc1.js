function calc (operation, a, b) {
  if (operation === 'add') {
    return a + b;
  }
  else if (operation === 'multi') {
    return a * b;
  }
  else if (operation === 'substract') {
    return a - b;
  }
}

calc ('add', 1, 2);