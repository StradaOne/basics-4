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
        default:
            console.log('oops!');
            return null;

    }
}
console.log(calc("add", 1, 2));
console.log(calc("multi", 1, 2));
console.log(calc("substract", 1, 2));
console.log(calc("something", 3, 4));