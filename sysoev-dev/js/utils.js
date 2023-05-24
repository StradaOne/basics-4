export const roundValue = value => Math.round(value);

export function convertDate(utc) {
  const date = new Date(utc * 1000);
  return `${date.getHours()}:${date.getMinutes()}`;
}
