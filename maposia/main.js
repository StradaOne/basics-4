const replacingNum = false //Управляет возможность замены номера, даже если такой уже существует

const phoneBook = {
  list: {
    John: 79118851351,
    Alina: 79245542334,
    Kate: 79110552233,
    Mike: 79250066111,
    Sam: 79220112245,
  },

  addContact(newContact, newNumber) {
    if (newContact in this.list) {
      console.log('Такой контакт уже есть')
      if (replacingNum) {
        console.log('Авозамена включена. Меняем номер на новый')
        phoneBook.list[newContact] = newNumber
      }
      return
    } else {
      this.list[newContact] = newNumber
    }
  },
  editContact(name, newNumber) {
    for (key in phoneBook.list) {
      if (key === name) {
        this.list[name] = newNumber
      }
    }
  },
}

phoneBook.addContact('John', 333)

phoneBook.editContact('Sam', 79995551111)

for (const name in phoneBook.list) {
  console.log(name + ' - ' + phoneBook.list[name])
}
