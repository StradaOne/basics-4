const phoneBook = {
    list: {
      Evgeniy: "+8(927)-533-11-53",
      Artem: "+8(927)-554-93-54",
      Arseniy: "+8(927)-584-93-51",
    },
  
    add(name, number) {
      name in this.list || Object.values(this.list).includes(number)
        ? console.log("Данное имя/номер уже существует\n")
        : (this.list[name] = number);
    },
  
    delete(name) {
      name in this.list
        ? delete this.list[name]
        : console.log("Данного имени нет в списке контактов!\n");
    },
    show() {
      console.log('Список контактов:\n')
      for (const name in phoneBook.list) {
        console.log(`${name} - ${phoneBook.list[name]} \n`);
      }
    },
  };
  
  phoneBook.add('Anderson','+8(927)-384-93-58')
  
  phoneBook.delete("Arseniy");
  
  phoneBook.show();