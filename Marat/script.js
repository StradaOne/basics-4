class Storage {
    name = 'Marat'
    key = 'name'

    constructor(key, storageType = 'local', defaultValue = null){
        this.key = key;
        this.storage = storageType === 'local' ? localStorage : sessionStorage;
        this.defaultValue = defaultValue
    }

    setItem(value){
        this.storage.setItem(this.key,  JSON.stringify(value));
    }
    getItem(){
        const value =  this.storage.getItem(this.key);
        return value ? JSON.parse(value) : this.defaultValue;
    }
    clear(){
        this.storage.removeItem(this.key);
    }
    isEmpty(){
        const value = this.getItem();
        return value === null || value === undefined;
    }
}

const names = new Storage('name', 'session');
names.setItem('Marat');
console.log(names.getItem());
console.log(names.isEmpty())

const age = new Storage('age', 'local', 25);
console.log(age.getItem());
age.setItem(30);
console.log(age.getItem());





