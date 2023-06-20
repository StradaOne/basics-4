import { line } from "./main.js";

export function answerLine(a) {
    
    console.log("all is good");
    let lineAnswer = '<div id="lastAnswer">' + a + '</div>';
    line.insertAdjacentHTML("afterbegin", lineAnswer);
}
