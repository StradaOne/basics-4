function wrongCellList() {
  console.log("This cell doesn't exist in the database");
}
const phoneBook = {
  list: {
    "Natali Lopuhova": 291234564,
    Vadim: 336116111,
    Lena: 298202906,
    Roman: 4504377018,
  },
  ShowList() {
    console.log(this.list);
  },
  addList(name, number) {
    if (name in this.list) {
      console.log("This contact already added.");
      return null;
    }
    this.list[name] = number;
  },
  deleteList(name) {
    if (this.list[name]) {
      delete this.list[name];
    } else return wrongCellList();
  },
  editList(name, number) {
    if (name in this.list) {
      this.list[name] = number;
    }
    return null;
  },
  outputList(name) {
    for (const name in phoneBook.list) {
      console.log(name + " - " + phoneBook.list[name]);
    }
  },
};

phoneBook.ShowList();
phoneBook.addList("Ben Larsson", 63627323);
phoneBook.deleteList("Peter");

phoneBook.ShowList();

phoneBook.deleteList("Roman");

phoneBook.ShowList();
phoneBook.addList("Vadim", 222322);
phoneBook.ShowList();
phoneBook.editList("Vadim", 222222);
phoneBook.ShowList();
phoneBook.editList("Valera", 22);
phoneBook.ShowList();
phoneBook.outputList();