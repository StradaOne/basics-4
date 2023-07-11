const storage = localStorage;

function setStorage(name, data) {
    storage.setItem(name, JSON.stringify(data));
}

function getStorage(name) {
    const data = JSON.parse(storage[name]);

    return data;
}

function removeStorage(name) {
    storage.removeItem(name);
}

export { setStorage, getStorage, removeStorage };
