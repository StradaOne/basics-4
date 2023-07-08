import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

function getTargetTime(date, timezone) {
   const newDate = new Date((date  + timezone) * 1000)
   const timeZone = 'UTC';
   const zonedTime = utcToZonedTime(newDate, timeZone);
   const newTime = format(zonedTime, 'HH:mm');
   return newTime;
};

function getTargetDay(date, timezone) {
	const newDate = new Date((date + timezone) * 1000);
	const timeZone = 'UTC';
	const localDate = utcToZonedTime(newDate, timeZone);
	const newDay = format(localDate, 'd MMM')
	return newDay;
};

export { getTargetDay, getTargetTime};