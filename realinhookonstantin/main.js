"use strict"

function сalc(a, b, operation) {
  // if (operation === 'add') {
  //   return a + b
  // }

  // if (operation == 'multi') {
  //   return a * b
  // }

  // if (operation == 'subtract') {
  //   return a - b
  // }

  switch(operation) {

    case 'add':
    return a + b;

    case 'multi':  
    return a * b;

    case 'subtract':  
    return a - b;
    
    default: 
    console.log('Strada one love!');
  }
}

сalc(5 , 2, 'subtract');