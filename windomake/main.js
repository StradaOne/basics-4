const storageType = {
	local: localStorage,
	session: sessionStorage,
};

class Storage {
	constructor(key, type = storageType.local) {
		this.key = key;
		this.type = type;
	}

	get() {
		console.log(this.type.getItem(this.key));
	}

	set(value) {
		this.type.setItem(this.key, value);
		console.log("File saved");
	}

	clear() {
		return this.type.removeItem(this.key);
	}

	isEmpty() {
		if (!this.type.getItem(this.key)) {
			console.log(true);
		} else {
			console.log(false);
		}
	}
}
