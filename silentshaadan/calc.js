function calc(a, b, operation) {
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
    }
}
console.log(Calc('add', 1, 2));
console.log(Calc('multi', 1, 2));
console.log(Calc('subtract', 3, 2));