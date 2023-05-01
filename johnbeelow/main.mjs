import data from './data.json' assert { type: 'json' }

let person =
  data.users[0].firstName +
  ', born at ' +
  data.users[0].dateOfBirth +
  ' and ' +
  data.users[0].knowsAs

console.log(person)
