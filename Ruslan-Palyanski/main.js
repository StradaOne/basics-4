
const numbers = new Array(1, 2, 3, 4, 5, 6, 7, 8);
numbers.forEach(number => {
    const message = `Number is ${number}`;
    console.log(message)
})

const animals = Array('cat', 'dog', 'elephant', 'tiger', 'lion');
const bigWord = animals.find(animal => animal.length > 7)
console.log(bigWord)

const nums = Array.of(1, 11, -2, 3, -10, 4);
const negativeNum =  nums.filter(number => number < 0);
console.log(negativeNum)

const newNumbers = [1, 11, -2, 3, -10, 4];
const modulNambers = newNumbers.map(number => Math.abs(number));
console.log(modulNambers)

const arrNumbers = [1, 11, -2, 3, -10, 4];
const sortedNubers = arrNumbers.sort((a,b) => b - a);
console.log(sortedNubers)