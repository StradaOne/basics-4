export const createEl = (element) => document.createElement(element);

export const convertKelvinToCelsius = (temp) => {
  const celsius = Math.round(parseInt(temp) - 273.15);

  return celsius;
};

export const convertUnixTimeToTime = (unixTime) => {
  const date = new Date(unixTime * 1000);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${hours}:${minutes}`;
};

export const convertUnixTimeToDate = (unixTime) => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const date = new Date(unixTime * 1000);
  const day = date.getDate();
  const month = months[date.getMonth()];
  return `${day} ${month}`;
};
