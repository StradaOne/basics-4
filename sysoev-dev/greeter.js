var Student = /** @class */ (function () {
  function Student(firstName, lastName, age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.fullName = ''.concat(firstName, ' ').concat(lastName, ', age: ').concat(age);
  }
  return Student;
})();
function greeter(person) {
  return 'Hello, '.concat(person.firstName, ' ').concat(person.lastName);
}
var user = new Student('Vadim', 'Sysoev', 28);
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
