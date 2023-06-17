import { line } from "./main.js";

export function answerLine(a) {
    
    let lineAnswer = '<div id="lastAnswer">' + a + '</div>';
    line.insertAdjacentHTML("afterbegin", lineAnswer);
} 