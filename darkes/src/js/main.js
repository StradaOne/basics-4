import { addDays, format, differenceInYears, differenceInDays, differenceInHours } from "date-fns";
import { animateCountup } from "./animation";
import { ELEMENTS } from "./ui";

async function calculateTime(date) {
	const currentDate = new Date();
	const targetDate = new Date(date);

	const daysInYear = 365;
	const hoursInDay = 24;
	const yearsDiff = differenceInYears(targetDate, currentDate);
	const daysDiff = differenceInDays(targetDate, currentDate) % daysInYear;
	const hoursDiff = differenceInHours(targetDate, currentDate) % hoursInDay;

	await animateCountup(ELEMENTS.DATE.HOUR, hoursDiff);
	await animateCountup(ELEMENTS.DATE.DAY, daysDiff);
	await animateCountup(ELEMENTS.DATE.YEAR, yearsDiff);
}

function buttonClick(e) {
	e.preventDefault();
	const enteredDate = ELEMENTS.INPUT.value;
	calculateTime(enteredDate);

	for (const elem of Object.values(ELEMENTS.DATE)) {
		elem.textContent = 0;
	}
}

function setMinDateTomorrow() {
	const nextDay = addDays(new Date(), 1);
	const strDate = format(nextDay, "yyyy-MM-dd");
	ELEMENTS.INPUT.setAttribute("min", strDate);
}

ELEMENTS.FORM.addEventListener("submit", buttonClick);
document.addEventListener("DOMContentLoaded", setMinDateTomorrow);
