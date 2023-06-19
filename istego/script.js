// Напишите класс Storage который будет создавать экземпляры для работы с localStorage
// Пример:
// const names = new Storage(names);
//names.get();  возвращает значение для ключа names в localStorage;
//names.set(); устанавливает значение для ключа names в localStorage;
//names.clear();  очищает значение для ключа names в localStorage;
//names.isEmpty();  вернет true если ключ names в localStorage имеет пустое значение (null || undefind);
// Создайте несколько экземпляров класса Storage и убедитесь что все они работают правильно
// Для класса Storage добавьте пару опций в конструктор
// чтобы можно было выбирать local или session storage
// возможность указать значение по-умолчанию (при создании экземпляра)

class Storage {
    constructor(key, storage = localStorage, defaultValue = 'defaultValue') {
        this.key = key;
        this.storage = storage;
        this.defaultValue = defaultValue;

        if (!this.storage) {
            throw new Error("Storage not available");
        }
    }

    set(value) {
        this.storage.setItem(this.key, JSON.stringify(value));
    }

    get() {
        const value = this.storage.getItem(this.key);
        return value !== null ? JSON.parse(value) : this.defaultValue;
    }

    clear() {
        this.storage.removeItem(this.key);
    }

    isEmpty() {
        return this.get() === null || this.get() === undefined;
    }
}

const test = new Storage('test');

test.set('new value');
console.log(test.get());
test.clear();
console.log(test.get());
console.log(test.isEmpty());