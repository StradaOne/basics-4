class Im {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

class Man {
  name: string;
  age: number;
  phone: string;
  adres: string;

  constructor(name: string, age: number, phone: number, adres: string) {
    this.name = name;
    this.age = age;
    this.phone = `+${phone}`;
    this.adres = `Russia ${adres}`;
  }
}

let users = {
  Human: new Im("Nikita", 20),
  Human1: new Man("Andry", 25, 88005553535, "Novosibirsk"),
  Human2: new Man("Dariya", 10, 88005553535, "Novokuzneck"),
  Human3: new Man("Artem", 50, 88005553535, "Moscov"),
};

console.log(users);
