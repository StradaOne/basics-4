import { intervalToDuration, formatDuration, format } from "date-fns";
import { ru } from "date-fns/locale";

const input = document.querySelector(".date");
const btn = document.querySelector(".btn");
const resultNode = document.querySelector(".result");

function getQuantityOfDays(obj) {
	let daysQuantity = obj.days;
	if (obj.months > 0) {
		const averageQuantityOfDaysInMonth = 30.4;
		daysQuantity = Math.ceil(obj.months * averageQuantityOfDaysInMonth + obj.days);
	}
	return daysQuantity;
}

function isLeapYear(year) {
	const leap = new Date(year, 1, 29).getDate();
	if (leap === 29) {
		return true;
	}
	return false;
}

function getDurationObj(customDate) {
	const durationObj = intervalToDuration({
		start: new Date(customDate),
		end: new Date(),
	});
	let durationInDays = getQuantityOfDays(durationObj);
	console.log(durationInDays);
	const daysInYear = 365;
	durationInDays = durationInDays < daysInYear ? durationInDays : durationInDays - daysInYear;
	const year = new Date(customDate).getFullYear();
	if (isLeapYear(year) && (+durationObj.years === 0 || +durationObj.years % 4 === 0)) {
		durationObj.days = durationInDays + 1;
		console.log(durationObj.days);
	} else {
		durationObj.days = durationInDays;
	}
	console.log(durationObj);
	return durationObj;
}

function render(result) {
	resultNode.textContent = result;
}

function getDuration(obj) {
	const duration = formatDuration(
		obj,
		{ format: ["years", "days", "hours"], locale: ru },
		{ delimiter: ", " },
	);
	return duration;
}

function showResult(date) {
	const durationObj = getDurationObj(date);
	const duration = getDuration(durationObj);
	render(duration);
}

const btnHandler = (event) => {
	event.preventDefault();
	const customDate = input.value.split("-").join(", ");
	showResult(customDate);
};

btn.addEventListener("click", btnHandler);

function setInputAttributeMin() {
	const msInDay = 86400000;
	const dateInFormat = format(Date.now() + msInDay, "yyyy-MM-dd");
	input.setAttribute("min", dateInFormat);
}
setInputAttributeMin();
