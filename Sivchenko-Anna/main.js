const phoneBook = {
  list: {
    'Ilya': 787,
    'Liza': 5533322,
    'Sasha': 778899,
  },
  showList () {
    console.log(this.list);
  }

};

console.log(phoneBook);

phoneBook.Ilya = 380;
phoneBook["Mr Jay"] = 4444;
delete phoneBook.Sasha;

console.log(phoneBook);

phoneBook.showList();