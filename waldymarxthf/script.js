const phoneBook = {
	list: {
		Iliya: +649738218,
		Falikul: +364825197,
		Egorik: +845136498,
	},
	log() {
		console.log(this.list)
	},
	add(name, number) {
		if (name === this.list[name]) {
			console.log('Этот человек есть уже в записной книге \n')
		} else {
			this.list[name] = number
			console.log(`Человека с именем ${name} добавил \n`)
		}
	},
	delete(name) {
		if (!(name === this.list[name])) {
			delete this.list[name]
			console.log(`Человек с именем ${name} удален \n` ) 
		} else {
			console.log(`Человек с именем ${name} не существует \n`)
		}
	},
	showContact() {
		console.log('Contacts:')
		for(const name in phoneBook.list) {
			console.log(`\t ${name} - ${phoneBook.list[name]}`)
		}
	}
}


phoneBook.add('galya', 7392756481)
phoneBook.add('galyasdaa', 73935456481)
phoneBook.delete('Egorik')
phoneBook.showContact()