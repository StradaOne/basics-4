class Student {
  fullName: string;
  constructor(
    public firstName: string,
    public lastName: string,
    public age: number
  ) {
    this.fullName = `${firstName} ${lastName}, age: ${age}`
  }
}

interface Person {
  firstName: string;
  lastName: string;
  age: number;
}

function greeter(person: Person) {
  return `Hello, ${person.firstName} ${person.lastName}`
}

let user = new Student('Vadim', 'Sysoev', 28);
document.body.textContent = greeter(user);

// interface Person {
//   firstName: string;
//   lastName: string;
//   age: number
// }

// function greeter(person: Person) {
//   return "Hello, " + person.firstName + " " + person.lastName + ' ' + person.age;
// }
 
// const user = { 
//   firstName: 'Vadim',
//   lastName: 'Sysoev',
//   age: 28,
// };
 
// document.body.textContent = greeter(user);