import {OPERATOR} from './const.js'
const ELEMENTS = {
    STORY : document.querySelector('.story'),
    FIRSTNUMBER : document.querySelector('.firstNumber'),
    SECONDNUMBER : document.querySelector('.secondNumber'),
    OPERATOR : document.querySelector('.operator'),
    RESULT : document.querySelector('.result'),
    BUTTONRESULT : document.querySelector('.buttonResult')
}
let countStory = 1;
function calc (a,b,operator){
    if (typeof(a) != 'number' || typeof(b) != 'number') {
        return false;
    }
    if (isNaN(a) || isNaN(b)){
        return false;
    }
    let res = (operator == OPERATOR.ADD)?(a+b):
              (operator == OPERATOR.MULTI)?(a*b):
              (operator == OPERATOR.SUBTRACT)?(a-b):
              (operator == OPERATOR.DIVISION)?(a/b):false;
    addStory(res);
    return res;
}
function addStory(resultElement){
    const newElement = document.createElement('div');
    newElement.className = countStory;
    newElement.textContent = `${countStory}.  ${resultElement}`;
    newElement.style.color = "red";
    countStory++;
    newElement.addEventListener('click', function(event){
        ELEMENTS.STORY.removeChild(event.target);
    });
    ELEMENTS.STORY.appendChild(newElement);
}
    
function main(){
    ELEMENTS.RESULT.textContent=calc(Number(ELEMENTS.FIRSTNUMBER.value),Number(ELEMENTS.SECONDNUMBER.value),ELEMENTS.OPERATOR.value);
}
ELEMENTS.BUTTONRESULT.addEventListener('click', main);

