import { answerLine } from "./answerLine.js";
import { deleteAnswer } from "./deleteAnswer.js";

const equalButton = document.getElementById('equal');
export const form = document.getElementById('form');
const answer = document.getElementById('answer');
const select = document.getElementById('action');



export const line = document.getElementById('lineAnswers');




function calculate(event){
    event.preventDefault();
    const valueOne = Number(document.getElementById('valueOne').value);
    const valueTwo = Number(document.getElementById('valueTwo').value);
    const action = select.value;    
    
    let result = 0;

    switch (action) {
        case "*" :
            result = valueOne * valueTwo;
            break;
        case "/" :
            result = valueOne / valueTwo;
            break;
        case "+" :
            result = valueOne + valueTwo;
            break;
        case "-" :
            result = valueOne - valueTwo;
            break;
        default:
            console.log("Error");
    }
    answer.textContent = result;
    answerLine(result);
}




equalButton.addEventListener("click", calculate)
//equalButton.addEventListener("click", calculate); 
line.addEventListener("click", deleteAnswer);

