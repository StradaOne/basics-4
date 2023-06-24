class Storage {
    constructor(storage, key, value) {
        this.storage = storage;
        this.key = key;
        this.value = value;
    }
    get() {
        return this.storage.getItem(this.key);
    }
    set(value) {
        this.value = value ?? this.value;
        this.storage.setItem(this.key, this.value);
    }
    clear() {
        this.storage.removeItem(this.key);
    }
    isEmpty() {
        return this.get() === null || this.get() === 'undefined';
    }
}

const city = new Storage(localStorage, 'city', 'Moscow');
const user = new Storage(sessionStorage, 'name');
city.set();
console.log(city.get());
console.log(city.isEmpty());
city.clear();
user.set();
console.log(user.get());
console.log(user.isEmpty());
user.set('Misha');
console.log(user.get());
console.log(user.isEmpty());

