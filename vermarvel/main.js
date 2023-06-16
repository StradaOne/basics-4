"use strict";

class Storage {
  constructor(key, storageType = "local", defaultValue = null) {
    this.key = key;
    this.storage = storageType === "session" ? sessionStorage : localStorage;
    this.defaultValue = defaultValue;
  }

  get() {
    const value = this.storage.getItem(this.key);
    return value !== null ? JSON.parse(value) : this.defaultValue;
  }

  set(value) {
    this.storage.setItem(this.key, JSON.stringify(value));
  }

  clear() {
    this.storage.removeItem(this.key);
  }

  isEmpty() {
    const value = this.get();
    return value === null || value === undefined;
  }
}

const cities = new Storage("cities", "local", []);

cities.set(["Vienna", "Paris", "New York", "Paris"]);
console.log(cities.get());
console.log(cities.isEmpty());
cities.set(["Hong Kong", "Calgary", "Sydney"]);
console.log(cities.get());
console.log(cities.isEmpty());

const pets = new Storage("pets", "local", []);

pets.set([
  "a female puppy Luna",
  "a male kitten Simon",
  "a female hamster Grunya",
  "a male dog Schwartz",
]);
console.log(pets.get());
console.log(pets.isEmpty());
cities.set([
  "a female cat Grace",
  "a male kitten Chappie",
  "a male puppy Rufus",
]);
console.log(cities.get());
console.log(cities.isEmpty());
