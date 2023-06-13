import { formatDuration, intervalToDuration } from 'date-fns/esm';
import { utcToZonedTime } from 'date-fns-tz/esm';

const DOM_ELEMENTS = {
  DATE: document.querySelector('.container-date'),
  FORM: document.querySelector('.container-form'),
  RESULT: document.querySelector('.container-timer'),
};

function calculate(value) {
  const duration = intervalToDuration({
    start: utcToZonedTime(new Date(value), 'UTC'),
    end: new Date(),
  });

  const formatting = formatDuration(duration, {
    format: ['years', 'days', 'hours', 'minutes'],
  });
  return formatting;
}

function renderCalculate() {
  if (!DOM_ELEMENTS.DATE.value) {
    (DOM_ELEMENTS.RESULT.innerHTML = 'Enter the date!!!');
    return;
  }
  DOM_ELEMENTS.RESULT.innerHTML = calculate(DOM_ELEMENTS.DATE.value);
}

DOM_ELEMENTS.FORM.addEventListener('submit', (event) => {
  event.preventDefault();
  renderCalculate();
});
