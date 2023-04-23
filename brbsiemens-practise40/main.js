let firstNumb = document.getElementById('firstNumber');
let secondNumb = document.getElementById('secondNumber');
const selector = document.getElementById('calc_operation');



import {sum} from './operations.js'

function subtraction(num1,num2){
  res = num1-num2
return res
}

function multiplication(num1,num2){
  res = num1*num2
return res
}

function division(num1,num2){
  res = num1/num2
return res
}


function recentRessult(res){
const newDiv = document.createElement('div');
newDiv.textContent = res;
document.body.appendChild(newDiv);

newDiv.addEventListener("click", () => {
 newDiv.remove();
});
}

function calc(){
  var num1 = Number(firstNumb.value);
  var num2=Number(secondNumb.value)
const calcOption=selector.value
let res
//isValid(num1,num2)
if(calcOption==="+"){
 res=sum(num1,num2)
}
if(calcOption==="-"){
  res=subtraction(num1,num2)
 }
 if(calcOption==="/"){
  res=division(num1,num2)
 }
 if(calcOption==="*"){
  res=multiplication(num1,num2)
 }

 if(res != NaN){
  recentRessult(res)
}
 
document.getElementById('result').innerHTML =res;
}

resButton.addEventListener('click', calc);