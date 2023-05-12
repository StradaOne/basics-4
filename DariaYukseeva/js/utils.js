
export const getDOMElement = (selector) => document.querySelector(selector);

export function timeConverter(UNIX_timestamp, timeZone) {
    const date = new Date((UNIX_timestamp + timeZone) * 1000);
    const localDate = date.toLocaleString([], { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' });
    const time = localDate;
    return time;
}

export function saveToLocalStorage(key, object) {
    localStorage.setItem(key, JSON.stringify(object));
}

export function loadFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
   
}