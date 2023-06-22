'use strict';

class Storage {
  static storagesType = {
    local: localStorage,
    session: sessionStorage,
  };

  constructor(key, method = Storage.storagesType.local, value = 'Test value') {
    this.key = key;
    this.method = method;
    this.value = value;
    this.set(value);
  }
  set(value) {
    this.method.setItem(this.key, JSON.stringify(value));
  }
  get() {
    try {
      return JSON.parse(this.method.getItem(this.key));
    } catch (error) {
      console.log(error);
    }
  }
  clear() {
    this.method.setItem(this.key, null);
  }
  isEmpty() {
    return !this.get();
  }
}

const names = new Storage('test1231');
console.log(names.get());
names.clear();
console.log(names.get());
console.log(names.isEmpty());

const test = new Storage('wtf?', Storage.storagesType.local, 'xxxzxxx');
console.log(test.get());
console.log(test.isEmpty());
