import { format } from 'date-fns';

function convTime(time, dateStandard) {
  const date = new Date(time * 1000);
  if (dateStandard === 'HH:mm') return format(date, dateStandard);
  if (dateStandard === 'MMM dd') return format(date, dateStandard);
}

export { convTime };
