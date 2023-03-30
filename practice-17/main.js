const phoneBook = {
    list: {
        'Artem': 79156545123,
        'Kirill': 78562145628,
        'Andrei': 75236984527,
    }, 

    add(name, number) {
        if (typeof name === 'string' && typeof number === 'number') {
            this.list[name] = number;
        } else {
            console.log('Data entered incorrectly...');
        }
    },

    del(name) {
        if (typeof name === 'string') {
            delete this.list[name];
        } else {
            console.log('Data entered incorrectly...');
        }
    },

    conList() {
        console.log('\t Contact:');

        for (let name in phoneBook.list) {
            console.log(`\t ${name}: ${phoneBook.list[name]}`);
        }
    },
};

console.log('Jonh' in phoneBook.list);
console.log('Artem' in phoneBook.list);

phoneBook.add('Vladimir', 78954562891);

phoneBook.del('Andrei');

phoneBook.conList(); 