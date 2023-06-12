import intervalToDuration from "date-fns/intervalToDuration";
import { UI_ELEMENTS } from "./ui_elements";

function renderDate(resultObj) {
	if (resultObj.months > 0) {
		const avgDay = 30.4;
		// eslint-disable-next-line no-param-reassign
		resultObj.days = Math.ceil(resultObj.months * avgDay + resultObj.days);
	}
	UI_ELEMENTS.RESULT_SCREEN.textContent = `${resultObj.years} years ${resultObj.days} days ${resultObj.hours} hours`;
}

function countdown(e) {
	try {
		e.preventDefault();
		const nowDate = new Date();
		const endDate = new Date(UI_ELEMENTS.INPUT_DATE.value);
		const result = intervalToDuration({
			start: nowDate,
			end: endDate,
		});
		renderDate(result);
	} catch (err) {
		UI_ELEMENTS.RESULT_SCREEN.textContent = "Enter date like in example";
	}
	UI_ELEMENTS.INPUT_DATE.value = "";
}

UI_ELEMENTS.FORM.addEventListener("submit", (e) => countdown(e));
