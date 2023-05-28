function setLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getLocalStorage(value) {
    return localStorage.getItem(value)
}

export { setLocalStorage, getLocalStorage };