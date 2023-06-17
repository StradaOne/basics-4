class Storage {
    constructor(storage, key, defValue) {
        this.storage = storage;
        this.key = key;
        this.value = defValue;
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

const city = new Storage(localStorage, 'city', 'Polatsk');
const user = new Storage(sessionStorage, 'name');

city.set();
console.log(city.get());
console.log(city.isEmpty());
city.clear(); //!

user.set();
console.log(user.get());
console.log(user.isEmpty());

user.set('Egor');
console.log(user.get());
console.log(user.isEmpty());
