import { format } from "date-fns";

const convertKelvinToCelsius = (temperature) =>
  `${Math.round(temperature - 273.15)}°`


const convertUnixToTime = (time) => {
  const parseTime = new Date(time * 1000)
  const outputTime = format(parseTime, 'hh:mm')
  return outputTime
}


const convertUnixToDate = (date) => {
  const parseDate = new Date(date * 1000)
  const outputDate = format(parseDate, 'd MMMMMMMM')
  return outputDate
}


export {
  convertKelvinToCelsius,
  convertUnixToTime,
  convertUnixToDate,
}

