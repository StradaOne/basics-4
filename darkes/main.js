const firstInput = document.querySelector('.input-value-first');
const secondInput = document.querySelector('.input-value-second');
const operation = document.querySelector('.operation');
const buttonResult = document.querySelector('.button-result');
const valueResult = document.querySelector('.value-result');

function isNumberValid(value) {
   if (!isFinite(value)) {
      alert('Division by zero is impossible.');
      return false;
   }
   return true;
}

function isNumberEmpty(value) {
   if (!value) {
      alert('Enter the values.');
      return false;
   }
   return true;
}

function getResult(firstInput, secondInput) {
   let operator = operation.value;

   switch (operator) {
      case 'add':
         return firstInput + secondInput;

      case 'minus':
         return firstInput - secondInput;

      case 'multiply':
         return firstInput * secondInput;

      case 'divide':
         return firstInput / secondInput;
   }
}

function printResult() {
   const firstNumber = firstInput.value;
   const secondNumber = secondInput.value;
   const resultNumber = getResult(+firstNumber, +secondNumber);

   if (!isNumberEmpty(firstNumber)) {
      return;
   }

   if (!isNumberEmpty(secondNumber)) {
      return;
   }

   if (!isNumberValid(resultNumber)) {
      return;
   }

   valueResult.textContent = parseFloat(resultNumber.toFixed(1));
}

buttonResult.addEventListener('click', printResult);