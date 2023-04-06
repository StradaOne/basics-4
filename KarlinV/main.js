// *Задача № 1 forEach

const createArrayNumbers = (num) => {
  const arr = [];
  for (let i = 0; i <= num; i++) {
    arr.push(i);
  }
  return arr;
};

createArrayNumbers(5).forEach((number) => {
  console.log(`Number is ${number}`);
});

// *Задача № 2 search

const animals = ["cat", "dog", "elephant", "tiger", "lion"];

const searchValueInArray = animals.find((value) => value.length > 7);

console.log(searchValueInArray);

// *Задача № 3 filter

const arrNumbers = [1, 11, -2, 3, -10, 4];

const newArrNumbers = arrNumbers.filter((number) => number < 0);

console.log(newArrNumbers);

// *Задача № 4 map

const absoluteValues = arrNumbers.map((num) => Math.abs(num));

console.log(absoluteValues);

// *Задача № 5 sort

const sortedNumbers = arrNumbers.sort((a, b) => b - a);

console.log(sortedNumbers);
