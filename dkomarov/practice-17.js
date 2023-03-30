const phoneBook = {
	list: {
		"John": 123456789,
		"Jane Doe": 987654321,
		"Jim Smith": 111111111
	},
    addContact(name, number) {
        if (typeof name === 'string' && typeof number === 'number') {
            this.list[name] = number;
        } else {
            console.log('incorrect value...')
        }
    },

    delContact(name) {
        if (this.list[name]) {
            delete this.list[name];
        } else {
            console.log('This name not in List')
        }
        
    }, 

    changeContact(name, number) {
        if (this.list[name]) {
            this.list[name] = number;
        }
    }
};

phoneBook.addContact('Oleg Sav', 9201112233);
phoneBook.delContact("John");
phoneBook.changeContact('Jane Doe', 9999999);

function showPhoneBook () {
    for (const name in phoneBook.list) {
        console.log(`${name} - ${phoneBook.list[name]}`)
            
    };
};

showPhoneBook();



