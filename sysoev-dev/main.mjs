import data from './data.json' assert { type: 'json' };

function showFirstNames(array) {
  array.forEach(item => {
    console.log(item.firstName);
  });
}

function showUsersDetails(array) {
  array.forEach(item => {
    console.log(`${item.firstName}, born at ${item.dateOfBirth} and ${item.knowsAs}`);
  });
}

showFirstNames(data.users);
showUsersDetails(data.users);

const json = JSON.stringify(data);
console.log(json);
const obg = JSON.parse(json);
console.log(obg);
