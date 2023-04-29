// Exporting module

const getEl = (s) => document.querySelector(s);
// *****Variables********

// Elements
const input = getEl("#display");
const resultsScr = getEl(".results-screen");
const binsScr = getEl(".bin-screen");
const row = getEl(".row");

// Input Numbers
const numbersParent = document.querySelector(".numbers");
const btn1 = getEl("#btn-1");
const btn2 = getEl("#btn-2");
const btn3 = getEl("#btn-3");
const btn4 = getEl("#btn-4");
const btn5 = getEl("#btn-5");
const btn6 = getEl("#btn-6");
const btn7 = getEl("#btn-7");
const btn8 = getEl("#btn-8");
const btn9 = getEl("#btn-9");
const btn0 = getEl("#btn-0");
const dot = getEl("#dot");

// Iterables
const buttons = getEl(".num");
const operations = getEl(".operation");

// Input Operations
const plus = getEl("#plus");
const minus = getEl("#minus");
const neg = getEl("#neg");
const divide = getEl("#divide");
const multiply = getEl("#multiply");
const clear = getEl(".clear");
const equal = getEl(".equal");

const btnClearResults = getEl("#clear-results");

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
