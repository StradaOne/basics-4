// DOM
const getDOM = (s) => document.querySelector(s);

const container = getDOM(".container");
const formHigh = getDOM(".form-high");
const formLow = getDOM(".form-low");
const fieldHigh = getDOM(".add-task-high");
const fieldLow = getDOM(".add-task-low");
const btnAddLow = getDOM("#btn-low");
const btnAddHigh = getDOM("#btn-high");
const inputLow = getDOM("#low");
const inputHigh = getDOM("#high");
const lowContainer = getDOM(".low-container");
const highContainer = getDOM(".high-container");
const checkbox = getDOM(".checkbox");
const parentLow = getDOM(".tasks-low");
const parentHigh = getDOM(".tasks-high");
const sourceDiv = getDOM(".hidden");

export default {
  container,
  formHigh,
  formLow,
  fieldHigh,
  fieldLow,
  btnAddHigh,
  btnAddLow,
  inputHigh,
  inputLow,
  lowContainer,
  highContainer,
  checkbox,
  parentLow,
  parentHigh,
  sourceDiv,
};
