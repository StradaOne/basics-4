function setLocalStorageParse(key, value) {
   localStorage.setItem(key, JSON.stringify(value));
}

function setLocalStorage(key, value) {
   localStorage.setItem(key, value);
}

function getLocalStorage(value) {
   return localStorage.getItem(value)
}

export { setLocalStorageParse, setLocalStorage, getLocalStorage };