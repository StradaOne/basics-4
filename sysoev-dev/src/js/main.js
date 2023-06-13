import { parseISO, intervalToDuration, format, isPast } from 'date-fns';
import { UI_ELEMENTS } from './ui';

function resetMinDateInput() {
  const strDateNow = format(new Date(), 'yyyy-MM-dd');
  UI_ELEMENTS.INPUT.setAttribute('min', strDateNow);
}

function checkDateIsPast(date) {
  return isPast(date);
}

function showInterval({ years, months, days, hours, minutes }, dateIsPast) {
  UI_ELEMENTS.OUTPUT_YEAR.textContent = years;
  UI_ELEMENTS.OUTPUT_DAY.textContent = days;
  UI_ELEMENTS.OUTPUT_HOURS.textContent = hours;
  UI_ELEMENTS.OUTPUT_MOUNTH.textContent = months;
  UI_ELEMENTS.OUTPUT_MINUTES.textContent = minutes;

  if (dateIsPast) {
    UI_ELEMENTS.OUTPUT_TITLE.textContent = 'Прошло';
    return;
  }

  UI_ELEMENTS.OUTPUT_TITLE.textContent = 'Осталось';
}

function getDateInterval(nowDate, endDate) {
  return intervalToDuration({
    start: nowDate,
    end: endDate,
  });
}

function submitFormHandler(event) {
  event.preventDefault();
  const nowDate = new Date();
  const endDate = parseISO(UI_ELEMENTS.INPUT.value);
  const dateIsPast = checkDateIsPast(endDate);
  const interval = getDateInterval(nowDate, endDate);
  showInterval(interval, dateIsPast);
  event.target.reset();
}

document.addEventListener('DOMContentLoaded', resetMinDateInput);
UI_ELEMENTS.FORM.addEventListener('submit', submitFormHandler);
