const сalc = (operation, a, b) => {
  switch(operation) {
    case 'add': console.log(a + b);
    break
    case 'multi': console.log(a * b);
    break
    case 'subtract' :  console.log(a - b);
    break
  }
};


сalc('add', 6, 7);
сalc('multi', 5, 7);
сalc('subtract', 6, 7);









