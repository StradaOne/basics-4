
export const getDOMElement = (selector) => document.querySelector(selector);

export function correctSpellingOfCity(city) {
    let str = city.trim()
    return str[0].toUpperCase() + str.slice(1).toLowerCase();
}

export function timeConverter(UNIX_timestamp, timeZone) {
    const date = new Date((UNIX_timestamp + timeZone) * 1000);
    const localDate = date.toLocaleString([], { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' });
    const time = localDate;
    return time;
}