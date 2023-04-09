let numbers = [];
let numbersResult = [];
let strings = [];
let stringResult = [];

// Создать массив из целых чисел и используя метод forEach, вывести их в консоль с текстовым сообщением Number is ${number}

numbers = [1, 55, 95, -10, 0, 3];

numbers.forEach((numbers) => {
  console.log(`Number is ${numbers}`);
});

// Найдите первое слово длиной больше 7 символов и выведите его в консоль

strings = ["cat", "dog", "elephant", "tiger", "lion"];

stringResult = strings.find((string) => string.length > 7);

console.log(stringResult);

// Создайте новый массив только из отрицательных чисел

numbers = [1, 11, -2, 3, -10, 4];

numbersResult = numbers.filter((numbers) => numbers < 0);

console.log(numbersResult);

// Создайте новый массив из абсолютных значений элементов и выведите его в консоль.

numbers = [1, 11, -2, 3, -10, 4];

numbersResult = numbers.map((numbers) => Math.abs(numbers));

console.log(numbersResult);

// Отсортируйте массив по убыванию и выведите его в консоль.

numbers = [1, 11, -2, 3, -10, 4];

numbersResult = numbers.sort((a, b) => b - a);

console.log(numbersResult);