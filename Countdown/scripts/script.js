import dom from "./dom.js";
import errors from "./errors.js";
import { formatDuration, intervalToDuration } from "date-fns";
import { ru } from "date-fns/locale";

function calcTime(date) {
  const duration = intervalToDuration({
    start: new Date(date),
    end: new Date(),
  });

  const result = formatDuration(duration, {
    format: ["years", "days", "hours"],
    locale: ru,
  });
  return result;
}

function renderDate(date) {
  const result = calcTime(date);
  dom.txt.textContent = result;
}

dom.button.addEventListener("click", (event) => {
  event.preventDefault();
  if (dom.input.value !== "") {
    const dateValue = dom.input.value;
    renderDate(dateValue);
  } else {
    console.error(errors.errorClearInput);
  }
});
