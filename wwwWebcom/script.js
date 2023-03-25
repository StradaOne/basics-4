function calc(operation, a, b) {
    switch (operation) {
      case "add":
        return a + b;
      case "multi":
        return a * b;
      case "substract":
        return a - b;
      default: 
          return 'Error value'
    }
  }
  
  console.log(calc("mul", 10, 5));