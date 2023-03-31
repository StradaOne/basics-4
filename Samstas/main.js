// 3 objects in one
let user = {
  name: "John Doe",
};

let object1 = {
  age: 20,
};

let object2 = {
  height: 180,
};

Object.assign(user, object1, object2);

console.log(user);

//copy link in a new variable
let newUser = user;

console.log(newUser);

//copy link of object with three dots
//first way
const book = {
  pages: 100,
  tiitle: "American boy",
};

const book2 = { ...book };
book2.pages = 300;

console.log(book);
console.log(book2);

//second way
const phone = {
  number: 77777,
  location: "Chicago, USA",
};

const phone2 = {
  ...phone,
  model: "Apple",
};

console.log(phone2);

//deep copy of object
const person = {
  name: "Bob",
  age: 22,
  location: {
    country: "USA",
    city: "Miami",
  },
};

function deepCopy(obj) {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  const copy = {};
  for (let key in obj) {
    copy[key] = deepCopy(obj[key]);
  }
  return copy;
}

const personCopy = deepCopy(person);

personCopy.location.city = 'Boston'

console.log(person)
console.log(personCopy);
