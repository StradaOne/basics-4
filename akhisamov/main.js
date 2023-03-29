const telegBook = {
    list: {
        'Mother': 99999999,
        'Father': 88888888,
        'Brother Arthur': 77777777
    },
    add(name, number) {
        this.list[name] = number;
    },
    del(name) {
        delete this.list[name];
    }
};

telegBook.add('Nastya', 232323232);
telegBook.del('Father');

for (const name in telegBook.list) {
    console.log(name + ' - ' + telegBook.list[name]);
}