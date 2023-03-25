// function calc(operation, a, b) {
//     if (operation == 'add') {
//         return a + b;
//     }
//     else if (operation == 'multi') {
//         return a * b;
//     }
//     else if (operation == 'subtract') {
//         return a - b;
//     }
//     else {
//         return 'Something went wrong';
//     }
// }

// console.log(calc('hjgf', 1, 1));

function calc(operation, a, b,) {
    switch (operation) {
        case "add":
            return a + b;
            break;
        case "multi":
            return a * b;
            break;
        case "subtract":
            return a - b;
            break;
        default:
            return "something went wrong"
            break;
    }
}
console.log(calc('add', 1, 1));