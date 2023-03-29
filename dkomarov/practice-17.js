const phoneBook = {
	list: {
		"John": 123456789,
		"Jane Doe": 987654321,
		"Jim Smith": 111111111
	},
    add(name, number) {
        if (typeof name === 'string' && typeof number === 'number') {
            this.list[name] = number;
        } else {
            console.log('incorrect value...')
        }
        
       
        
    },

    del(name) {
        if (this.list[name]) {
            delete this.list[name];
        } else {
            console.log('This name not in List')
        }
        
    }

};


phoneBook.add('Oleg Sav', 9201112233);
phoneBook.del("John");
console.log(phoneBook);