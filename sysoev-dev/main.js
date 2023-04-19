const UI_ELEMENTS = {
  NUM1: document.querySelector('.calc__form-input--num-one'),
  NUM2: document.querySelector('.calc__form-input--num-two'),
  FORM: document.querySelector('.calc__form'),
  OPERATION: document.querySelector('.calc__form-select'),
  OUTPUT: document.querySelector('.calc__form--output'),
};

const OPERATION = {
  ADD: 'add',
  MULTI: 'multi',
  SUBSTRACT: 'substract',
  DIVISION: 'division',
};

const ERROR_NUMBER_MESSAGE = 'Number Error';
const ERROR_OPERATION_MESSAGE = 'Unknow operation';

const OPERATIONS = {
  add(num1, num2) {
    return Number(num1) + Number(num2);
  },
  multi(num1, num2) {
    return Number(num1) * Number(num2);
  },
  substract(num1, num2) {
    return Number(num1) - Number(num2);
  },
  division(num1, num2) {
    return Number(num1) / Number(num2);
  },
};

function isNumber(num) {
  return Number.isFinite(num);
}

function showResult(value) {
  if (!isNumber(value)) {
    alert(ERROR_NUMBER_MESSAGE);
    return;
  }

  UI_ELEMENTS.OUTPUT.textContent = value;
}

function calc(num1, num2, operation) {
  const isValid = isNumber(num1) && isNumber(num2);

  if (!isValid) {
    alert(ERROR_NUMBER_MESSAGE);
    return;
  }

  switch (operation) {
    case OPERATION.ADD:
      return OPERATIONS.add(num1, num2);
    case OPERATION.MULTI:
      return OPERATIONS.multi(num1, num2);
    case OPERATION.SUBSTRACT:
      return OPERATIONS.substract(num1, num2);
    case OPERATION.DIVISION:
      return OPERATIONS.division(num1, num2);
    default:
      alert(ERROR_OPERATION_MESSAGE);
      break;
  }
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
