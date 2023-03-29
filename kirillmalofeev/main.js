const telegramBook = {
  list: {
    Лерочка: 89811977481,
    Мама: 89218894595,
    "Slava Rostovtcev": 89213221185,
    "Ромарио ипполит": 89137664368,
  },
  log() {
    console.log(this.list);
  },
  add(name, number) {
    this.list[name] = number;
  },
  remove(name) {
    delete this.list[name];
  },
};
telegramBook.add("Kirill", 90878789);
telegramBook.remove("Лерочка");
telegramBook.log();

for (const name in telegramBook.list) {
  console.log(name + " - " + telegramBook.list[name]);
}
telegramBook.log();
