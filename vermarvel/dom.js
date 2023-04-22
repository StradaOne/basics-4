// Exporting module

// *****Variables********

// Elements
const input = document.getElementById("display");
const resultsScr = document.querySelector(".results-screen");
const binsScr = document.querySelector(".bin-screen");
const row = document.querySelector(".row");

// Input Numbers
const numbersParent = document.querySelector(".numbers");
const btn1 = document.getElementById("btn-1");
const btn2 = document.getElementById("btn-2");
const btn3 = document.getElementById("btn-3");
const btn4 = document.getElementById("btn-4");
const btn5 = document.getElementById("btn-5");
const btn6 = document.getElementById("btn-6");
const btn7 = document.getElementById("btn-7");
const btn8 = document.getElementById("btn-8");
const btn9 = document.getElementById("btn-9");
const btn0 = document.getElementById("btn-0");
const dot = document.getElementById("dot");

// Iterables
const buttons = document.getElementsByClassName("num");
const operations = document.getElementsByClassName("operation");

// Input Operations
const plus = document.getElementById("plus");
const minus = document.getElementById("minus");
const neg = document.getElementById("neg");
const divide = document.getElementById("divide");
const multiply = document.getElementById("multiply");
const clear = document.querySelector(".clear");
const equal = document.querySelector(".equal");

const btnClearResults = document.getElementById("clear-results");

// Helper functions&variables
const empty = "";
const errorZero = "Can't divide by zero";
const errorData = "invalid input";

export default {
  input,
  resultsScr,
  binsScr,
  row,

  numbersParent,
  btn0,
  btn1,
  btn2,
  btn3,
  btn4,
  btn5,
  btn6,
  btn7,
  btn8,
  btn9,
  dot,
  buttons,
  operations,

  plus,
  minus,
  multiply,
  divide,
  neg,

  clear,
  equal,
  btnClearResults,

  errorData,
  errorZero,
  empty,
};
