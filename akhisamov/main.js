const numbers = [2, 5, 8, 15];

numbers.forEach(number => {
    console.log(`Number is ${number}`);
});


const animals = ['cat', 'dog', 'elephant', 'tiger', 'lion'];
const sevenLetters = animals.find(item => item.length > 7);
console.log(sevenLetters);


const numbersTwo = [1, 11, -2, 3, -10, 4];
const negativeNumbers = numbersTwo.filter(number => number < 0);
console.log(negativeNumbers);


const numbersThree = [1, 11, -2, 3, -10, 4];
const absoluteValue = numbersThree.map(number => Math.abs(number));
console.log(absoluteValue);


const numbersFour = [1, 11, -2, 3, -10, 4];
numbersFour.sort((a, b) => b - a);
console.log(numbersFour);