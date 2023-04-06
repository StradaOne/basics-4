// forEach
const array = [1, 2, 3, 25, 16];
array.forEach(number => {
    console.log(`Number is ${number}`);
});



// find

const animals = ['cat', 'dog', 'elephant', 'tiger', 'lion'];
const longAnimalName = animals.find(animal => animal.length > 7);
console.log(longAnimalName);



// filter

const arrayNumbers = [1, 11, -2, 3, -10, 4];
const newArrayNumbers = arrayNumbers.filter(number => number < 0);
console.log(newArrayNumbers);



// map

const arrayNumbers = [1, 11, -2, 3, -10, 4];
const arrayNumbersAbsolute = arrayNumbers.map(number => Math.abs(number));
console.log(arrayNumbersAbsolute);



// sort
// сортировка по убыванию
const numbers = [1, 11, -2, 3, -10, 4];
const newArrayNumbers = numbers.sort((a,b) => b - a);
console.log(newArrayNumbers); 





