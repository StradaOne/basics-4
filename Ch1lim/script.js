class Storage {
  constructor(key, value, storage = 'local') {
    this.key = `${key}`;
    if (storage === 'local') this.storage = localStorage;
    if (storage === 'session') this.storage = sessionStorage;
    this.value = `${value}`;
  }

  get() {
    return (`${this.key}:${this.storage.getItem(this.key)}`);
  }

  set(value = this.value) {
    this.storage.setItem(this.key, value);
  }

  clear() {
    this.storage.setItem(this.key, undefined);
  }

  isEmpty() {
    const value = this.storage.getItem(this.key);
    if (value === 'undefined'
            || value === 'null'
            || value === undefined
            || value === null) {
      return true;
    }

    return false;
  }
}

const session = new Storage('mya');
session.set();
console.log(session.get());
console.log(session.isEmpty());
