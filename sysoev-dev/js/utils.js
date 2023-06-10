import { fromUnixTime, getHours, getMinutes } from 'date-fns';

export const roundValue = (value) => Math.round(value);

export function convertDate(utc) {
  return `${getHours(fromUnixTime(utc))}:${getMinutes(fromUnixTime(utc))}`;
}
