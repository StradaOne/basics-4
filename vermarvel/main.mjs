import data from "./data.json" assert { type: "json" };

for (let i = 0; i < data.users.length; i++) {
  const name = data.users[i].firstName;
  const lName = data.users[i].lastName;
  const dBirth = data.users[i].dateOfBirth;
  const knowsAs = data.users[i].knowsAs;

  console.log(`${name} ${lName} born on ${dBirth} and ${knowsAs}.`);
}

for (let i = 0; i < data.users.length; i++) {
  console.log(data.users[i].firstName);
}

for (let i = 0; i < data.users.length; i++) {
  console.log(data.users[i].firstName.toUpperCase());
}
