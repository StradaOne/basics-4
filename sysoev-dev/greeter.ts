
const form = document.querySelector('.form');
const input = document.querySelector('.form__input');
const text = document.querySelector('.text');

function showGreeting(value: number) {
  console.log(`you ${value} age`);
  
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  
  showGreeting(12)
})

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
text.textContent = greeter(user);
