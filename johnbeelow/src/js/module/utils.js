import { format } from 'date-fns'

const convertTime = (time = new Date()) => {
  const parseTime = new Date(time)
  const outputTime = format(parseTime, 'HH:mm')
  return outputTime
}

const generateHash = () => Math.floor(Math.random() * 1000000).toString()

export { convertTime, generateHash }
