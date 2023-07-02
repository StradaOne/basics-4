import { format } from "date-fns";

const convertTime = () => {
  const time = new Date()
  const formatTime = format(time, 'HH:mm')
  return formatTime
}

export { convertTime }