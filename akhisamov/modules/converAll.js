export function convertTime(item) {
    let date = new Date (item * 1000);
    return `${addZeroToNumber(date.getHours())}:${addZeroToNumber(date.getMinutes())}`
}

export function addZeroToNumber(value) {
    return (value < 10) ? '0' + value : value
}

export function convertDate (date) {
    const parseDate = new Date(date * 1000)
    const day = parseDate.getDate()
    const month = parseDate.toLocaleString('en', { month: 'long' })
    const outputDate = `${day} ${month}`
    return outputDate
}