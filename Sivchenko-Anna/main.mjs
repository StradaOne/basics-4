import data from "./data.json" assert { type: "json" };

const users = data.users;

function showInfoAboutUsers (obj) {
  obj.forEach((item) => {
    console.log(
      `${item.firstName} ${item.lastName}, born at ${item.dateOfBirth} and knows as ${item.knowsAs}`
    );
  });
}

console.log(showInfoAboutUsers(users));