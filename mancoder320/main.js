// if else version with console.log

function calc(a, b, operation) {
  if (operation == 'add') {
    return a + b
  }
  else if (operation == "multi") {
    return a * b
  }
  else if (operation == "subtract") {
    return a - b
  }
}
console.log(calc(1, 2, 'add'));
console.log(calc(3, 4, 'multi'));
console.log(calc(10, 6, 'subtract'));



// Switch version with prompt and alert:

let operation = prompt("Please choose 'add', 'multi' or 'subtract'");
let a = +prompt("Please choose number', ''");
let b = +prompt("Please choose number', ''");

switch (operation) {
  case 'add':
    alert(a + b);
    break;
  case 'multi':
    alert(a * b);
    break;
  case 'substract':
    alert(a - b);
    break;
  default:
    alert('You make wrong choice, try again!!!!');
}