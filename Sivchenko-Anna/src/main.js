const STORAGE_TYPE = {
	LOCAL: "local",
	SESSION: "session",
};

class Storage {
	constructor(key, storage = STORAGE_TYPE.LOCAL, value = null) {
		this.key = key;
		this.storage = storage === STORAGE_TYPE.LOCAL ? localStorage : sessionStorage;
		this.value = value;
		this.storage.setItem(key, value);
	}

	set(value) {
		this.storage.setItem(this.key, JSON.stringify(value));
	}

	get() {
		try {
			return JSON.parse(this.storage.getItem(this.key));
		} catch (error) {
			console.log(error);
		}
	}

	clear() {
		this.storage.removeItem(this.key);
	}

	isEmpty() {
		return !this.get();
	}
}

const names = new Storage("names");
const professions = new Storage("professions", "architect", STORAGE_TYPE.SESSION);

names.set("Ilya");
console.log(names.get());
console.log(names.isEmpty());
names.clear();
console.log(names.isEmpty());

console.log(professions.get());
professions.set("designer");
console.log(professions.isEmpty());
