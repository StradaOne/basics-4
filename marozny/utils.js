const round = (number) => Math.round(number);

function timeConverter(time, timezone) {
  const newDate = new Date((time + timezone) * 1000);
  const localDate = newDate.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  });
  return localDate;
}

function findLocationIndex(storage, name) {
  return storage.findIndex((el) => el.location === name.textContent);
}

export { round, timeConverter, findLocationIndex };
