import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

const round = (number) => Math.round(number);

function timeConverter(time, timezone) {
	const newDate = new Date((time + timezone) * 1000);
	const localDate = utcToZonedTime(newDate, 'UTC');
	const formatDate = format(localDate, 'HH:mm');
	return formatDate;
}

function getCookie() {
	return document.cookie.split('; ').reduce((acc, item) => {
		const [name, value] = item.split('=');
		acc[name] = value;
		return acc;
	}, {});
}

export { getCookie, round, timeConverter };
