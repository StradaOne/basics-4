import { format } from "date-fns";

const convertTime = () => {
  const parseTime = new Date()
  const outputTime = format(parseTime, 'HH:mm')
  return outputTime
}

export { convertTime }
