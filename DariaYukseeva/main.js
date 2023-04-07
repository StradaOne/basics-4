const numbers = [3, 9, 4, 100, 50];
numbers.forEach(num => {
    console.log(`Number is ${num}`);
})

const animals = ['cat', 'dog', 'elephant', 'tiger', 'lion'];
const firstWordWithSevenChar = animals.find(animal => animal.length > 7);
console.log(firstWordWithSevenChar);

const numbers2 = [1, 11, -2, 3, -10, 4];
const negativeNumbers = numbers2.filter(num => num < 0);
console.log(negativeNumbers);

const numbers3 = [1, 11, -2, 3, -10, 4];
const absoluteNumbers = numbers3.map(num => Math.abs(num));
console.log(absoluteNumbers);

const numbers4 = [1, 11, -2, 3, -10, 4];
const sortedNumbers = numbers4.sort((a, b) => b - a);
console.log(sortedNumbers);
