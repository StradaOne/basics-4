class Storage {
	constructor(name, storage, value) {
		this.name = name;
		this.storage = storage;
		this.value = value;
	}

	clear() {
		this.storage.removeItem(this.name);
	}

	set(value = this.value) {
		this.storage.setItem(this.name, JSON.stringify(value));
	}

	get() {
		return JSON.parse(this.storage.getItem(this.name));
	}

	isEmpty() {
		if (this.value === null || this.value === undefined) {
			return true;
		}
		return false;
	}
}

const names = new Storage("names", localStorage);
names.set();
// console.log(names.get());
console.log(names.isEmpty());
// names.clear(); // очищает значение для ключа names в localStorage;
// names.isEmpty(); // вернет true если ключ names в localStorage имеет пустое значение (null || undefind);
// возвращает значение для ключа names в localStorage;
// устанавливает значение для ключа names в localStorage;
