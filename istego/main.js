// #1 Вывод массива из целых чисел используя метод forEach
const integer = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
integer.forEach(number => console.log(`Number is ${number}`));

// #2 Вывод первого слова длиной больше 7 символов
const animals = ['cat', 'dog', 'elephant', 'tiger', 'lion'];
const wordMaxLength = animals.find(word => word.length > 7);
console.log(wordMaxLength);

// #3 Вывод нового массива только из отрицательных чисел
const randomNambers = [1, 11, -2, 3, -10, 4];
const negativeNumbers = randomNambers.filter(number => number < 0);
console.log(negativeNumbers);

// #4 Вывод новый массив из абсолютных значений 
const absoluteNumbers = randomNambers.map(number => number < 0 ? number * -1 : number);
console.log(absoluteNumbers);

// #5 Вывод элементов массива по убыванию
const sortedNumbers = randomNambers.sort((a, b) => b - a);
console.log(sortedNumbers);
