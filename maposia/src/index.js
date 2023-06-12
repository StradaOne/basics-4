import { format, formatDuration, intervalToDuration } from 'date-fns';
import { ru } from 'date-fns/locale';

const form = document.querySelector('.date__form');
const inputForm = document.querySelector('.date__input__form');
const outputNode = document.querySelector('.time__left__output');
const nowDate = new Date();

function formatDateRequires(date) {
  return format(date, 'yyyy-MM-dd');
}

function setRequires(date) {
  const minDate = formatDateRequires(date);
  inputForm.setAttribute('min', minDate);
}

function render() {
  setRequires(nowDate);
}

function calcDays() {
  const duration = intervalToDuration({
    start: new Date(),
    end: new Date(inputForm.value),
  });
  const localeTime = formatDuration(duration, {
    format: ['years', 'months', 'days'],
    delimiter: ' ',
    locale: ru,
  });
  return localeTime;
}

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  outputNode.textContent = calcDays();
});

render();
