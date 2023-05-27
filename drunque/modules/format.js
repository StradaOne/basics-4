export const formatTemp = (temp) => `${Math.round(+temp)}°`;

function getTime(unix, timezone) {
  const currentTimeZone = Math.abs(new Date().getTimezoneOffset() / 60);
  if (timezone === undefined) timezone = currentTimeZone;
  const difference = +timezone - currentTimeZone;

  const date = new Date(unix * 1000);

  const format = (time) => String(time).padStart(2, "0");
  const hours = (24 + date.getHours() + difference) % 24;
  const minutes = date.getMinutes();

  return [hours, minutes].map(format).join(":");
}

export function formatTime(unix, timezone) {
  const timezoneTime = getTime(unix, timezone)
  const userTime = getTime(unix)
  return `${timezoneTime} (${userTime})`
}