const firstValue = document.querySelector('.firstValue');
const secondValue = document.querySelector('.secondValue');
const operations = document.getElementById('operations');
const buttons = document.querySelector('.button');
const results = document.querySelector('.results');
let result;

function calculation() {
   let number1 = Number(firstValue.value)
   let number2 = Number(secondValue.value)
   switch (operations.value) {
    case '+':
        result = number1 + number2;
        break;
    case '-':
        result = number1 - number2;
        break;
    case '*':
        result = number1 * number2;
        break;
    case '/':
        result = number1 / number2;
        break;
   } 
   const newChild = document.createElement('div');
   newChild.textContent = result;
   results.insertAdjacentElement('beforeend', newChild);
   results.addEventListener('click', (event) => {
    event.target.remove();
    event.target.removeEventListener;
   });
}

buttons.addEventListener('click', calculation);
