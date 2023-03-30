const phonebook = {
  list: {
    John: "123-456-7890",
    "Jane Ostin": "987-654-3210",
    "Mary Watson": "123-456-7890",
    "Mike Tyson": "987-654-3210",
    "Adam Sandler": "123-456-7890",
  },
};

const fullname = "Jane Ostin";

console.log(phonebook.list[fullname]);

const phonebook2 = {
  list: {
    John: 1234567890,
    "Jane Ostin": 9876543210,
    "Mary Watson": 1234567890,
    "Mike Tyson": 9876543210,
    "Adam Sandler": 1234567890,
  },

  add(name, number) {
    this.list[name] = number;
  },

  delete(name) {
    delete this.list[name];
  },


};

for(const name in phonebook2.list) {
    console.log(`${name}: ${phonebook2.list[name]}`)
}

phonebook2.add("Jim Kimmel", 9556942560);
phonebook2.delete("Mike Tyson");
console.log(phonebook2.list["Jim Kimmel"]);
console.log(["Mary Watson"] in phonebook2.list);

console.log(phonebook2.list);
