const phoneBook = {
	list: {
		"John" : 435345345,
		"David" : 84355345,
		"Eva" : 9234723324
	},

	add(name, number) {
		this.list[name] = number;
	},

	remove(name) {
		delete this.list[name]
	}
}

phoneBook.add("Liza", 99989998)
phoneBook.remove("David")

for (const name in phoneBook.list) {
	console.log(name, "-", phoneBook.list[name])
}
