const refresh = document.querySelector('#refresh');
const firstNum = document.querySelector('#firstNum');
const secondNum = document.querySelector('#secondNum');
const addition = document.querySelector('#addition');
const subtraction = document.querySelector('#subtraction');
const multiplication = document.querySelector('#multiplication');
const division = document.querySelector('#division');
const equals = document.querySelector('#equals');
let result;

addition.addEventListener('click', function () {
  result = +firstNum.value + +secondNum.value;
    equals.addEventListener('click', function () {
      output.value = result;
    })
}); 

subtraction.addEventListener('click', function () {
  result = +firstNum.value - +secondNum.value;
    equals.addEventListener('click', function () {
      output.value = result;
    })
}); 

multiplication.addEventListener('click', function () {
  result = +firstNum.value * +secondNum.value;
    equals.addEventListener('click', function () {
      output.value = result;
    })
});

division.addEventListener('click', function () {
  result = +firstNum.value / +secondNum.value;
    equals.addEventListener('click', function () {
      output.value = result;
    })
});

refresh.addEventListener('click', function () {
  output.value = 0;
  firstNum.value = "";
  secondNum.value = "";
});