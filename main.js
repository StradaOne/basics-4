const contacts = {
    'Alyona': '@aaaaa',
    'Olga': '@oooooo',
    'beloved son': '@mmmmm',
}

console.log(contacts);
console.log(contacts.Olga);
console.log(contacts['beloved son']);

contacts['dad'] = '@ddddddddd';
console.log(contacts);

contacts.Olga = '@ooooo1';
console.log(contacts.Olga);

contacts['beloved son'] = '@max';
console.log(contacts['beloved son']);

contacts.mom = '@mother';
console.log(contacts);

delete contacts.Alyona;
console.log(contacts);

contacts.log = function () {
    console.log(this.dad);
}
console.log(contacts.log());

contacts.add = function(name, nickname) {
    this[name] = nickname;
}
contacts.remove = function(name) {
    delete this[name];
}

delete contacts.log;
console.log(contacts);

contacts.add('brother', '@ssssssssss');
console.log(contacts);

contacts.remove('Olga');
console.log(contacts);

for (const name in contacts) {
    console.log(`${name} - ${contacts[name]}`);
}