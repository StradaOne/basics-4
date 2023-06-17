
const STORAGE_VALUE = {
  LOCAL: localStorage,
  SESSION : sessionStorage
}


class Storage {
  constructor(key, name, storage = localStorage) {
    this.name = name;
    this.key = key;
    this.storage = storage;
  }
  get() {
    return JSON.parse(this.storage.getItem(this.key));
  }
  set(name = this.name) {
    return this.storage.setItem(this.key, JSON.stringify(name));
  }
  clear() {
    this.storage.removeItem(this.key);
  }
  isEmpty() {
    const item = JSON.parse(this.storage.getItem(this.key))
    if (item === null || item === undefined) {
      return true
    }
    return false
  }

}

const nameOne = new Storage("NameOne", "Ivan");
const nameTwo = new Storage("NameTwo", "Dmitriy");
const nameThree = new Storage("NameThree");
const nameFour = new Storage('NameFour', 'Evpatiy', STORAGE_VALUE.SESSION)


nameOne.set();
nameOne.clear()
nameOne.set('Pasha');
console.log(nameOne.get())

nameTwo.set('Dmitriy')
console.log(nameTwo.get())

nameThree.set();
nameThree.clear()
nameThree.set('Masha');
console.log(nameThree.get())


nameFour.set()
console.log(nameFour.get())
nameFour.clear()



console.log(nameOne.isEmpty());
console.log(nameTwo.isEmpty());
console.log(nameThree.isEmpty());
console.log(nameFour.isEmpty())







