/* Урок 11 

function checkAge(age) {
    let result = (age < 18) ? console.log('you are not allowed') : console.log('you are welcome!');
}

checkAge(10);
checkAge(14);
checkAge(25);
*/
/* function calc(operation, a, b) {
    if (operation === "add") {
        return a + b;
    } else if (operation === "multi") {
        return a * b;
    } else if (operation === "substract") {
        return b - a;
    } else {
        return "Wrong";
    }
}

console.log(calc("add", 1, 2));
console.log(calc("multi", 1, 2));
console.log(calc("substract", 1, 2)); */

function calc(operation, a, b) {
    switch (operation) {
        case "add":
            return a + b;
            break;
        case "multi":
            return a * b;
            break;
        case "substract":
            return b - a;
            break;

    }
}
console.log(calc("add", 1, 2));
console.log(calc("multi", 1, 2));
console.log(calc("substract", 1, 2));
console.log(calc("substract", 1, 2));