class Storage {
    constructor(storage, key, value) {
        this.storage = storage;
        this.key = key;
        this.value = value;
    }

    get() {
        return JSON.parse(this.storage.getItem(this.key));
    }

    set(value = this.value) {
            this.storage.setItem(this.key, JSON.stringify(value));
    }

    clear() {
        this.storage.removeItem(this.key);
    }

    isEmpty() {
        return this.key === null || this.key === undefined ? true : false;
    }
}

const city = new Storage(localStorage, 'city', 'Yaroslavl');
console.log(city)
console.log(city.get())