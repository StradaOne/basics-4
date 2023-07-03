import { format } from "date-fns";

function convTime() {
  const date = new Date();
  const newDate = format(date, 'HH:mm');
  return newDate
}

const date = convTime()

export { date };
