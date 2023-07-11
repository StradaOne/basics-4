import { format } from "date-fns";

export function convTime(time) {
  const date = new Date(time);
  const newDate = format(date, 'HH:mm');
  return newDate
}

