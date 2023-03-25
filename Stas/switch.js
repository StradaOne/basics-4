// CHANGE THIS CODE 
function calc(a,b,operation) {
    if (operation === 'add') {return a + b} 
    else if (operation === 'multi') {return a * b}
    else if (operation === 'subtract') {return a - b}
    else {return 'Invalid operation'}
}

console.log(calc(5,2,'subtract')) // 3

//TO SWITCH CODE
function calc(operation,a,b) {
    switch (operation) {
        case 'add':
            return a + b

        case 'multi':
            return a * b

        case 'subtract':
            return a - b

        default:
            return 'Invalid operation'
    }
}

console.log(calc('multi',8,3))


