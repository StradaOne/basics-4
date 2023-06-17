const equalButton = document.getElementById('equal');
const answer = document.getElementById('answer');
const select = document.getElementById('action');

const line = document.getElementById('lineAnswers');


let result = 0;

function calculate(){
    const valueOne = Number(document.getElementById('valueOne').value);
    const valueTwo = Number(document.getElementById('valueTwo').value);
    const action = select.value;    

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

function answerLine(a) {
    let lineAnswer = '<div id="lastAnswer">' + a + '</div>';
    line.insertAdjacentHTML("afterbegin", lineAnswer);
} 

function deleteAnswer() {
    let answer = document.getElementById('lastAnswer');
    line.removeChild(answer);
}

equalButton.addEventListener("click", calculate); 
line.addEventListener("click", deleteAnswer);

