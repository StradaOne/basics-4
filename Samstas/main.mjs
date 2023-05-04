import data from "./data.json" assert { type: "json" };

let userNames = data.users;

const users = Object.values(userNames);

users.forEach((object) => {
  console.log(
    `${object.firstName} ${object.lastName}, born at ${object.dateOfBirth} and was ${object.knowsAs}.` +
      "\n"
  );
});
