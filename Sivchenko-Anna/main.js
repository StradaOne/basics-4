const phoneBook = {
  list: {
    'Ilya': 787,
    'Liza': 5533322,
    'Sasha': 778899,
  },
  showList() {
    console.log(this.list);
  },
  addContact(name, number) {
    this.list[name] = number;
  },
  deleteContact(name) {
    delete this.list[name];
  }
};

phoneBook.addContact("Misha", 88991122);
phoneBook.deleteContact("Sasha");

console.log(phoneBook);
console.log("Sasha" in phoneBook.list);

for (const name in phoneBook.list) {
  console.log(name + " - " + phoneBook.list[name]);
}