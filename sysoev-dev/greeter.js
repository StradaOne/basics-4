"use strict";
const form = document.querySelector('.form');
const input = document.querySelector('.form__input');
const text = document.querySelector('.text');
function showGreeting(value) {
    console.log(`you ${value} age`);
}
form.addEventListener('submit', (event) => {
    event.preventDefault();
    showGreeting(12);
});
class Student {
    constructor(firstName, lastName, age) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.fullName = `${firstName} ${lastName}, age: ${age}`;
    }
}
function greeter(person) {
    return `Hello, ${person.firstName} ${person.lastName}`;
}
let user = new Student('Vadim', 'Sysoev', 28);
text.textContent = greeter(user);
