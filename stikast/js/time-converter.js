export function timeConverter(time, timezone) {
  const newTime = new Date((time + timezone) * 1000);
	const localTime = newTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' });
	return localTime
}
