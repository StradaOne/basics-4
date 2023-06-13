const getEl = (el) => document.querySelector(el);

const dom = {
  wrapper: getEl(".wrapper"),
  btnSortToSmall: getEl(".btn-sort-to-small"),
  btnSortToBig: getEl(".btn-sort-to-Big"),
  btnSortToSettings: getEl(".btn-settings"),

  parentItems: getEl(".parent-items"),
  form: getEl(".date-form"),
  dateSelect: getEl("#date-select"),
  nameInput: getEl("#name-input"),
  btnAdd: getEl(".btn-add"),
  heading: getEl(".heading"),
  outputUI: getEl("#output"),
};

export default dom;
