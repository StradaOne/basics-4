const phoneBook = {
  list: {
    'Fernando K': 12345634,
    'Kate Mos': 278743,
    'Bidjei Blazkowicz': 27430261,
    'Carl Jhonson': 987423,
  },
  add(name, number) {
    this.list[name] = number;
    return `Person: '${name}' with number: ${number} added.`;
  },
  delete(name) {
    if (!(name in this.list)) {
      return `${name} not found`;
    } else {
      delete this.list[name];
      return `${name} deleted.`;
    }
  },
  getContacts() {
    console.log('Contacts:');
    for (const name in this.list) {
      console.log(`\t ${name} - ${this.list[name]}`);
    }
  },
};

console.log(phoneBook.add('Trevis Hons', 828632));
console.log(phoneBook.delete('Carl Jhonson'));
console.log(phoneBook.getContacts());
