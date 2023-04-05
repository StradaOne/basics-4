const contacts = {
    list: {
        'Alyona': '72022222222',
        'Olga': '75069875311',
        'beloved son': '75486325744',
    }
};

console.log(contacts);
console.log(contacts.list.Olga);
console.log(contacts.list['beloved son']);

contacts.list['dad'] = '@ddddddddd';
console.log(contacts.list);

contacts.list.Olga = '@ooooo1';
console.log(contacts.list.Olga);

contacts.list['beloved son'] = '@max';
console.log(contacts.list['beloved son']);

contacts.list.mom = 78963254788;
console.log(contacts.list);

delete contacts.list.Alyona;
console.log(contacts.list);

contacts.log = function () {
    console.log(this.list.dad);
}
console.log(contacts.log());

contacts.add = function(name, number) {
    this.list[name] = number;
}
contacts.remove = function(name) {
    delete this.list[name];
}

delete contacts.log;
console.log(contacts);

contacts.add('brother', 76598734522);
console.log(contacts.list);

contacts.remove('Olga');
console.log(contacts.list);

for (const name in contacts.list) {
    console.log(`${name} - ${contacts.list[name]}`);
}