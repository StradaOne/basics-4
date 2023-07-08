import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

export function timeConverter(time, timezone) {
  const newTime = new Date((time + timezone) * 1000);
	const localTime = utcToZonedTime(newTime, "UTC");
	const date = format(localTime, 'HH:mm');
	// const localTime = newTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' });
	return date;
}
