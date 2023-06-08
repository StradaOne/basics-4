import {compareAsc, format} from 'date-fns'
import {utcToZonedTime} from 'date-fns-tz'

function convertUnix(timestamp, timezone) {
    return ((timestamp + timezone) * 1000)
}

function convertTime(timestamp, timezone = '') {
    const newTime = new Date((timestamp + timezone) * 1000)
    const localTime = utcToZonedTime(newTime, 'UTC');
    const formatLocalTime = format(localTime, 'HH:mm')
    return formatLocalTime
}

function convertDate(timestamp, timezone = '') {
    const newDate = new Date((timestamp + timezone) * 1000);
    const localDate = utcToZonedTime(newDate, 'UTC');
    const formatLocalDate = format(localDate, 'd MMM')
    return formatLocalDate;
}

function getUrlIcon(id) {
    return `https://openweathermap.org/img/wn/${id}@2x.png`
}

export {
    convertTime,
    getUrlIcon,
    convertDate
}