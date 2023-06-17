class Storage {
    #storages = {
        localStorage: 'localStorage',
        sessionStorage: 'sessionStorage',
    };

    constructor(key, storage, value) {
        this.key = key;
        this.storage =
            storage === this.#storages.localStorage || storage === this.#storages.sessionStorage
                ? storage
                : this.#storages.localStorage;
        this.value = this.set(value);
    };

    set(value) {
        switch (this.storage) {
            case this.#storages.localStorage:
                localStorage.setItem(this.key, value);
                break;
            case this.#storages.sessionStorage:
                sessionStorage.setItem(this.key, value);
                break;
            default:
                break;
        };
    };

    get() {
        switch (this.storage) {
            case this.#storages.localStorage:
                return localStorage.getItem(this.key);
                break;
            case this.#storages.sessionStorage:
                return sessionStorage.getItem(this.key);
                break;
            default:
                break;
        };
    };

    clear() {
        switch (this.storage) {
            case this.#storages.localStorage:
                localStorage.setItem(this.key, null);
                break;
            case this.#storages.sessionStorage:
                sessionStorage.setItem(this.key, null);
                break;
            default:
                break;
        };
    };

    isEmpty() {
        if (this.storage === this.#storages.localStorage) {
            return this.#checkStorage(localStorage);
        };
        if (this.storage === this.#storages.sessionStorage) {
            return this.#checkStorage(sessionStorage);
        };
    };

    #checkStorage(storage) {
        const value = storage.getItem(this.key);
        return value === 'null' || value === 'undefined';
    }
};

const names = new Storage('names', 'sessionStorage', 'value');
names.clear()
names.set()
console.log(sessionStorage);
console.log(names.get());
console.log(names.isEmpty());

const name = new Storage('name', 'value2');
name.clear();
console.log(name.isEmpty());
name.set('value3')
console.log(sessionStorage);
console.log(name.get());
console.log(name.isEmpty()); 