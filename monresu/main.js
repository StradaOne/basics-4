'use strict'

class Storage {
  constructor(key, value = '') {
    this.key = key;
    localStorage.setItem(this.key, value);
  };
  get() {
    return localStorage.getItem(this.key);
  };
  set(value) {
    localStorage.setItem(this.key,(value));
  };
  clear() {
    localStorage.removeItem(this.key);
  };
  isEmpty() {
    return !localStorage.getItem(this.key);
  };
};

const names = new Storage('names');
names.set('John');
console.log(names.get()); // 'John'
console.log(names.isEmpty()); // false

const age = new Storage('age');
age.set(25);
console.log(age.get()); // 25
console.log(age.isEmpty()); // false

names.clear();
console.log(names.get()); // null
console.log(names.isEmpty()); // true
