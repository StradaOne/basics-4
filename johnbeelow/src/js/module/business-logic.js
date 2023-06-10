import { formatDuration, intervalToDuration } from 'date-fns'
import ru from 'date-fns/locale/ru'

const calcDate = (value) => {
  const duration = intervalToDuration({
    start: new Date(value),
    end: new Date(),
  })

  const result = formatDuration(duration, {
    format: ['years', 'days', 'weeks', 'hours'],
    locale: ru,
  })
  return result
}

export default calcDate
