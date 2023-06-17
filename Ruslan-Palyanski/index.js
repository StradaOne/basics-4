// const names = new Storage(’names’);
// names.get() возвращает значение для ключа names в localStorage;
// names.set() устанавливает значение для ключа names в localStorage;
// names.clear()  очищает значение для ключа names в localStorage;
// names.isEmpty()  вернет true если ключ names в localStorage имеет пустое значение (null || undefind);

class Storage {
    constructor(key, storage, defaultValue){
        this.key = key;
        this.storage = storage;
        this.defaultValue = defaultValue;
    }

    set(value = this.defaultValue){
        this.storage.setItem(this.key, JSON.stringify(value))
    }

    get(key = this.key){
        return JSON.parse(this.storage.getItem(key));
    }

    clear(key = this.key){
        this.storage.removeItem(key);
    }

    isEmpty(key = this.key){
        if(!this.storage.getItem(key)){
            return false;
        }
        return true;
    }
}

