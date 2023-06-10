import { ELEMENTS } from './uiVariables.js';
import { isDate, formatDuration, intervalToDuration } from 'date-fns';
import { ru } from 'date-fns/locale';
import Cookies from 'js-cookie';

// берем дату из печенек и рендерим, если эта дата там есть
function getCookiesDate() {
	const cookiesDates = Cookies.get('date');
	if (cookiesDates) {
		const dates = getDate(cookiesDates);
		timeRender(dates);
	};
	return;
};

// Приводим вводимую дату в нужный вид
function getDate(date) {
	date = new Date(date);
	if (isDate(date)) {
		const duration = intervalToDuration({
			start: date,
			end: new Date(),
		});

		// Если получили несколько месяцев до нужной даты
		// то вычисляем количество дней из этих месяцев
		if (duration.months > 0) {
			const avgDaysPerMontsh = 30.4;

			duration.days = Math.ceil((duration.months * avgDaysPerMontsh) + duration.days);
			duration.months = 0;
		};
 
		duration.days > 365 ? duration.days = 365 : duration.days - 365;

		Cookies.set('date', date);

		const result = formatDuration(duration, {
			format: ["years", "days", "hours"],
			locale: ru
		});

		return { dateInput: date, dateOutput: result };
	};
};

// Рендерим, проверяем, введенная дата меньше нынешней или нет
// Если меньше, то пишем "Прошло времени:"
// Иначе пишем "Осталось времени"
function timeRender(datesObj) {
	const switchText = datesObj.dateInput < new Date() ? 'Прошло времени:' : 'Осталось времени:';

	ELEMENTS.TIMER.TEXT.textContent = switchText;
	ELEMENTS.TIMER.COUNTER.textContent = datesObj.dateOutput;
};

ELEMENTS.FORM.BTN.addEventListener('click', (e) => {
	e.preventDefault();
	const dateInput = ELEMENTS.FORM.INPUT.value;
	const dateOutput = getDate(dateInput);
	timeRender(dateOutput);
});

ELEMENTS.FORM.FORM_WRAPPER.addEventListener('submit', (e) => {
	e.preventDefault();
	const dateInput = ELEMENTS.FORM.INPUT.value;
	const dateOutput = getDate(dateInput);
	timeRender(dateOutput);
});

getCookiesDate();