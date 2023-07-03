import { format } from "date-fns";

const convertTime = (date = new Date()) => {
  let time = new Date(date)
  const formatTime = format(time, 'HH:mm')
  return formatTime
}

export { convertTime }