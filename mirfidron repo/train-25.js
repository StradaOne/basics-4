// --- ex 1 ---

array = [1,4,6,8,9,];
array.forEach(number => console.log(`Number is ${number}`)) // Number is 1/n Number is 4/n Number is 6/n Number is 8/n Number is 9

// --- ex 2 ---

array = ['cat', 'dog', 'elephant', 'tiger', 'lion',];
const firstSeven = array.find(arr => arr.length > 7);
console.log(firstSeven) // elephant

// --- ex 3 ---

array = [1, 11, -2, 3, -10, 4,];
const target = array.filter(el => el < 0);
console.log(target); // [-2, -10]

// --- ex 4 --- для себя

const animals = ['cat', 'dog', 'elephant', 'tiger', 'lion'];
const upperCaseAnimals = animals.map(word => word[0].toUpperCase() + word.slice(1));
console.log(upperCaseAnimals); // [ 'Cat', 'Dog', 'Elephant', 'Tiger', 'Lion' ] 

// --- ex 5 ---

array = [1, 11, -2, 3, -10, 4,];
absNumber = array.map(number => Math.abs(number));
console.log(absNumber) // [ 1, 11, 2, 3, 10, 4 ]

// --- ex 6 ---

array = [1, 11, -2, 3, -10, 4,];
sortedArr = array.sort((a,b) => b-a);
console.log(sortedArr) // [ 11, 4, 3, 1, -2, -10 ]