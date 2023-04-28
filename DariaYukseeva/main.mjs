import data from './data.json' assert {type: "json"};

let users = data.users
function makeString(user) {
    const isCoFounder = user.knowsAs.match(/co-founder/);
    const insert = (!!isCoFounder) ? 'he is a' : 'he';
    return `${user.firstName} ${user.lastName} was born at ${user.dateOfBirth}, ${insert} ${user.knowsAs}\n`;
}

users.forEach(user => {
    const string = makeString(user)
    console.log(string);
})