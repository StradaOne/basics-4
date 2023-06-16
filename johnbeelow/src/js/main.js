const STORAGE = {
  LOCAL: localStorage,
  SESSION: sessionStorage,
}

class Storage {
  constructor(key, storage = STORAGE.LOCAL, value = null) {
    this.key = key
    this.storage = storage
    this.value = value
  }

  get() {
    const storedValue = this.storage.getItem(this.key)
    return JSON.parse(storedValue)
  }

  set(value = this.value) {
    return this.storage.setItem(this.key, JSON.stringify(value))
  }

  clear() {
    return this.storage.removeItem(this.key)
  }

  isEmpty() {
    if (this.key === null || this.key === undefined) {
      return true
    }
    return false
  }
}

const user = new Storage('test', STORAGE.SESSION)

// testing
user.get('Jex')
user.set('Jex')
// console.log(user.isEmpty())
console.log(user.get('Jex'))
// user.clear()
