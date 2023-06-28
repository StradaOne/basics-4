const storageTypes = {
	local: localStorage,
	session: sessionStorage,
};
class Storage {
	constructor(key, storage = storageTypes.local, defaultValue) {
		this.key = key;
		this.storage = storage;
		this.defaultValue = defaultValue;
	}

	get() {
		try {
			if (!this.storage.getItem(this.key)) {
				return this.defaultValue;
			}
			return JSON.parse(this.storage.getItem(this.key));
		} catch (err) {
			console.log(err);
		}
	}

	set(value = this.defaultValue) {
		this.storage.setItem(this.key, JSON.stringify(value));
	}

	clear() {
		this.storage.removeItem(this.key);
	}

	isEmpty() {
		try {
			return !JSON.parse(this.storage.getItem(this.key));
		} catch (err) {
			console.log(err);
		}
	}
}

const cities = new Storage("city", storageTypes.local, "Moscow");
console.log(cities.get());
cities.set("Ekaterinburg");
// cities.clear();
console.log(cities.get());
const isEmptyCityStorage = cities.isEmpty();
const user = new Storage("user", storageTypes.session);
user.set("Daria");
console.log(user.get());

user.clear();
console.log(isEmptyCityStorage);
console.log(user.isEmpty());
