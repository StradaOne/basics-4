const contacts = {
    list: {
        'Alyona': '72022222222',
        'Olga': '75069875311',
        'beloved son': '75486325744',
    }
};


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


contacts.add = function(name, number) {
    if (name in this.list) {
        console.log('The contact already exists. Add new number?');
        let add = true;
        if (add && this.list[name] !== number) {
            this.list[name] = this.list[name] +', ' + number;
        }
    }
    else {    
        this.list[name] = number;
    }
}
contacts.remove = function(name) {
    if (name in this.list) {
        delete this.list[name];
    }
}

contacts.add('brother', 76598734522);
console.log(contacts.list);

contacts.remove('Olga');
console.log(contacts.list);

for (const name in contacts.list) {
    console.log(`${name} - ${contacts.list[name]}`);
}

contacts.add('brother', 75454);
console.log(contacts.list);