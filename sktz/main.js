
let numbers = [];
for (i = 10; i < 100; i = i + 10) {
    numbers.push (i);
}

numbers.forEach (numberItem => {
    console.log (`Number is ${numberItem}`);
})

console.log (`
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
`);

const animals = ['cat', 'dog', 'elephant', 'tiger', 'lionzzzzzz'];
const lenghtAnimals = animals.filter (word => word.length > 7);
console.log (lenghtAnimals[0]);

console.log (`
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
`);

const a = [1, 11, -2, 3, -10, 4];

a.forEach (aItem => {
    if (aItem >= 0) {
        console.log (`Number is ${aItem}`);
    }
})

console.log (`>>>>>>>>>>>>>>>`);

let b = [];
a.forEach (aItem => {
    b.push (Math.abs(aItem));
})

b.forEach (aItem => {
    console.log (`Number is ${aItem}`);
})

console.log (`
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
`);

const sortNumber = a.sort((c, b) => b - c);
console.log (sortNumber);

