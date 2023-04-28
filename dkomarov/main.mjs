import data from './data.json' assert {type: "json"};

let userNames = data.users


const users = Object.values(userNames);

users.forEach(function(obj) {
    console.log(`${obj.firstName}, born of ${obj.dateOfBirth} and ${obj.knowsAs}.` + '\n')
})



