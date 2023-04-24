'use strict';
import { OPERATION } from "./base.js";
function calculate ({a,b,operation}){
    switch(operation){
      case OPERATION.sum:
         return  a + b;
         
      case OPERATION.minus:
         return a -b; 
       
      case OPERATION.mult:
          return a * b;
      
      case OPERATION.divider:
         return a / b;
         
          default:
              break;
    }
  }
const numberA = document.querySelector('.js-a-number');
const numberB = document.querySelector('.js-b-number');
const selectOperation = document.querySelector('.js-select-operation');
const resultOperation = document.querySelector('.result');
const btnResultNode = document.querySelector('.js-button');
const history = document.querySelector(".history");
const added = document.querySelector('.added');


btnResultNode.addEventListener('click', function(){
    const a = +numberA.value;
    const b = +numberB.value;
    const operation = selectOperation.value;
     const result = calculate({ a, b, operation });
      
     
     resultOperation.textContent = result;
     const saveResult = document.createElement("div");
        saveResult.classList.add('added');
        saveResult.textContent = result;
        history.appendChild(saveResult);
});
history.addEventListener('click',(event)=>{
    if (event.target.classList.contains("added")){
     event.stopPropagation();
     event.target.remove();
    }
 }); 


  

