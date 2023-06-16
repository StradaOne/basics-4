class Storage {
	constructor(key, storage, value) {
		this.key = key;
		this.storage = storage;
		this.value = value;
	}

	set(value = this.value) {
		this.storage.setItem(this.key, JSON.stringify(value));
	}

	get() {
		return JSON.parse(this.storage.getItem(this.key));
	}

	clear() {
		this.storage.removeItem(this.key);
	}

	isEmpty() {
		return !this.get();
	}
}
