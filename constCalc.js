export const btnCalc = document.body.querySelector(".buttonEquals");

export const ADD = 'add';
export const MULTI = 'multi';
export const SUBTRACT = 'subtract';
export const DIVISION = 'division';
export const ERROR = 'This is operation undefined';

export function getInputValue(sel) {
    return document.querySelector(sel).value;
}