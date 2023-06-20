import { line } from "./main.js";

export function deleteAnswer() {
    const answer = document.getElementById('lastAnswer');
    line.removeChild(answer);
}