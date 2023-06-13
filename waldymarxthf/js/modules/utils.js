import { format} from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'

export function timeConverter(time, timezone) {
	const newDate = new Date((time + timezone) * 1000)
	const localDate = utcToZonedTime (newDate, 'UTC');
	const date = format(localDate, 'HH:mm')
	return date
}

//* функция конвертации unix времени в обычное

export function dateConverter(date, timezone) {
	const newDate = new Date((date + timezone) * 1000);
	const localDate = utcToZonedTime (newDate, 'UTC');
	const date1 = format(localDate, 'd MMM')
	return date1;
}

//* функция конвертации unix даты в нормальную