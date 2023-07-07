import { format } from "date-fns";

const convertTime = (time = new Date) => {
  const parseTime = new Date(time)
  const outputTime = format(parseTime, 'HH:mm')
  return outputTime
}

export { convertTime }
