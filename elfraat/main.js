

function createCounter(){
    let count = 0;
    return function incrementCount(){
       return ++count;
    }
}



let counterA = createCounter();
let counterB = createCounter();

console.log(counterA());
console.log(counterA());
console.log(counterA());
console.log(counterB());
console.log(counterB());
