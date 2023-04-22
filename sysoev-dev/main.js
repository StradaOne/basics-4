import { UI_ELEMENTS } from './js/ui.js';
import { calc } from './js/calc.js';

export const OPERATION = {
  ADD: 'add',
  MULTI: 'multi',
  SUBSTRACT: 'substract',
  DIVISION: 'division',
};

export const ERRORS = {
  NUMBER: 'Number Error',
  OPERATION: 'Unknow operation',
};

export const OPERATIONS = {
  add(num1, num2) {
    return num1 + num2;
  },
  multi(num1, num2) {
    return num1 * num2;
  },
  substract(num1, num2) {
    return num1 - num2;
  },
  division(num1, num2) {
    return num1 / num2;
  },
};

function isNumber(num) {
  return Number.isFinite(num);
}

function deleteHistoryItem(event) {
  event.target.remove();
}

function showHistory(value) {
  const item = document.createElement('div');
  item.classList.add('calc__history-item');
  item.textContent = value;
  UI_ELEMENTS.HISTORY_BOX.append(item);
  item.addEventListener('click', deleteHistoryItem);
}

function showResult(value) {
  if (!isNumber(value)) {
    alert(ERRORS.NUMBER);
    return;
  }

  UI_ELEMENTS.OUTPUT.textContent = value;
  showHistory(value);
}

function gatherData() {
  event.preventDefault();
  const num1 = Number(UI_ELEMENTS.NUM1.value);
  const num2 = Number(UI_ELEMENTS.NUM2.value);
  const operation = UI_ELEMENTS.OPERATION.value;
  const result = calc(num1, num2, operation);
  showResult(result);
}

UI_ELEMENTS.FORM.addEventListener('submit', gatherData);
