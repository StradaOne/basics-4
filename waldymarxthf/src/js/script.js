import { formatDuration, intervalToDuration } from "date-fns";
import { ru } from "date-fns/locale";

const VARIABLES = {
	BUTTON: document.querySelector(".timer-date__btn"),
	DATE: document.querySelector(".timer-date__input"),
	TIME_LEFT: document.querySelector(".timer-left--time"),
};

let intervalID;

function calcTime(date) {
	const duration = intervalToDuration({
		start: new Date(date),
		end: new Date(),
	});

	const result = formatDuration(duration, { format: ["years", "days", "hours"], locale: ru });
	return result;
}

function renderDate(date) {
	if (intervalID) {
		clearInterval(intervalID);
	}

	intervalID = setInterval(() => {
		const result = calcTime(date);

		VARIABLES.TIME_LEFT.textContent = result;
	}, 100);
}

VARIABLES.BUTTON.addEventListener("click", (event) => {
	event.preventDefault();
	const dateValue = VARIABLES.DATE.value;
	renderDate(dateValue);
});
