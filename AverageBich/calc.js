console.log('Welcome to calculator')

// let numberOne = +prompt('Enter the first number. You can use only numbers', )
// let operation = prompt('Please, choose operation: add, multi or subtrat and enter it', )
// let numberTwo = +prompt('Enter the first number. You can use only numbers', )

let numberOne = 't'
let operation = 'add'
let numberTwo = 16

let checked = function checkNumber(value) {
    if (typeof value === 'number') {
        return true
    } else {
        return false
    }
}

let result = checked(numberOne)
let result2 = checked(numberTwo)

// function calc (operation,a,b) {
//     if(operation === 'add' && typeof a === 'number' && typeof b === 'number') {
//         return a + b
//     } else if (operation === 'multi') {
//         return a * b
//     } else if (operation === 'subtrar') {
//         return a - b
//     } else {
//         console.log('Error! Please, choose the right operation or Number!')
//     }
// }

function calc (operation,a,b,result) {
    if (result == true) {       
        if (operation === 'add') {
            return a + b
        } else if (operation === 'multi') {
            return a * b
        } else if (operation === 'subtrar') {
            return a - b
        } else {
            return 'Error! Please, choose the right operation!'
        }
    } else {
        return 'Error! Please, choose the number!'
    }
}



console.log(calc(operation,numberOne,numberTwo,result))

