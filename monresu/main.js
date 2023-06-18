'use strict'

class Storage {
  constructor(key, value = '', typeStorage = 'localStorage') {
    this.key = key;
    this.storage = typeStorage === 'localStorage' ? localStorage : sessionStorage;
    this.storage.setItem(this.key, value);
  };
  get() {
    return this.storage.getItem(this.key);
  };
  set(value) {
    this.storage.setItem(this.key,(value));
  };
  clear() {
    this.storage.removeItem(this.key);
  };
  isEmpty() {
    const item = this.storage.getItem(this.key);
    return item === 'undefined' || item === null;
  };
};

const STORAGE_NAMES = {
  localStorage: 'localStorage',
  sessionStorage: 'sessionStorage',
}

const names = new Storage('names', '123', STORAGE_NAMES.sessionStorage);
console.log(names.get()); // 'John'
console.log(names.isEmpty()); // false

const age = new Storage('age');
age.set(25);
console.log(age.get()); // 25
console.log(age.isEmpty()); // false

names.clear();
names.set();
console.log(names.get()); // null
console.log(names.isEmpty()); // true
