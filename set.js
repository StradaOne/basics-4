// Создаем массив с дублирующими значениями
const myArray = [1, 2, 3, 2, 4, 1];

// Создаем новый Set из массива, удаляя дубликаты
const mySet = new Set(myArray);

// Создаем массив из Set
const filteredArray = Array.from(mySet);

// Выводим результат
console.log(filteredArray); // выведет [1, 2, 3, 4]