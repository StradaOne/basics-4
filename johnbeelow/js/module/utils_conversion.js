export const convertKelvinToCelsius = (temperature) =>
  `${Math.round(temperature - 273.15)}°`

export function convertUnixToTime(time) {
  const parseTime = new Date(time * 1000)
  const hours = correctionTime(parseTime.getHours())
  const minutes = correctionTime(parseTime.getMinutes())
  const outputTime = `${hours}:${minutes}`
  return outputTime
}

export function convertUnixToDate(date) {
  const parseDate = new Date(date * 1000)
  const day = parseDate.getDate()
  const month = parseDate.toLocaleString('en', { month: 'long' })
  const outputDate = `${day} ${month}`
  return outputDate
}

function correctionTime(date) {
  return date.toString().padStart(2, '0')
}
