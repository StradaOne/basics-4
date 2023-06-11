import { formatDuration, intervalToDuration } from "date-fns";
import ru from "date-fns/locale/ru";
import { VARIABLES } from "./variables";

function getDateInterval(desiredDate) {
	const duration = intervalToDuration({
		start: new Date(),
		end: new Date(desiredDate),
	});
	const result = formatDuration(duration, {
		format: ["years", "months", "days", "hours", "minutes"],
		locale: ru,
	});
	return result;
}

let interval;

function render(desiredDate) {
	const text = new Date(desiredDate) < new Date() ? "Прошло времени:" : "Осталось времени:";
	VARIABLES.TEXT_RESULT.textContent = text;

	if (interval) {
		clearInterval(interval);
	}

	interval = setInterval(() => {
		VARIABLES.RESULT.textContent = getDateInterval(desiredDate);
	}, 100);
}

function submitForm(event) {
	event.preventDefault();
	const desiredDate = VARIABLES.DATE.value;
	render(desiredDate);
}

VARIABLES.FORM.addEventListener("submit", submitForm);
