import { el, dateUtils } from "./config.js";
import {
  formatDuration,
  differenceInHours,
  differenceInCalendarDays,
  differenceInCalendarYears,
} from "date-fns";
import { ru } from "date-fns/locale";

el.dateInput.setAttribute("min", dateUtils.getCurrentDateISOString());

el.dateBtn.addEventListener("click", render);

el.dateInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") render(event);
});

function render(event) {
  event.preventDefault();
  const pastDate = new Date(el.dateInput.value);

  if (!el.dateInput.value) return;
  if (pastDate < dateUtils.getCurrentDate()) {
    el.dateInput.value = "";
    return;
  }

  const diffInYears = differenceInCalendarYears(
    dateUtils.getCurrentDate(),
    pastDate
  );

  const remainingDays =
    differenceInCalendarDays(dateUtils.getCurrentDate(), pastDate) % 365;

  const diffInHours =
    differenceInHours(dateUtils.getCurrentDate(), pastDate) % 24;

  const interval = {
    years: Math.abs(diffInYears),
    days: Math.abs(remainingDays),
    hours: Math.abs(diffInHours),
  };

  const formattedDuration = formatDuration(interval, {
    locale: ru,
    delimiter: " ",
    format: ["years", "days", "hours"],
  });

  el.countdownDisplay.classList.remove("load-save-data");
  el.countdownDisplay.textContent = formattedDuration;

  el.dateInput.value = "";
}
