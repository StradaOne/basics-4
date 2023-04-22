import { UI_ELEMENTS } from './js/ui.js';
import { calc } from './js/calc.js';

function isInfinity(num) {
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

function showError() {
  UI_ELEMENTS.ERROR_BOX.classList.add('calc__error--active');
  UI_ELEMENTS.ERROR_BOX.addEventListener('click', () => {
    UI_ELEMENTS.ERROR_BOX.classList.remove('calc__error--active');
  });
}

function showResult(value) {
  if (!isInfinity(value)) {
    showError();
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
