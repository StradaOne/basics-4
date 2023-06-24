function calc(operation, a, b) {
    if (isNumber(a) && isNumber(b)) {
        switch (operation) {
            case "add":
                return a + b;
            case "multi":
                return a * b;
            case "subtract":
                return a - b;
            default:
                return null;
        }
    }
    else {
        return null;
    }
}
console.log(calc('add', 10, 1));

function isNumber(value) {
    return typeof value === 'number' && !isNaN(value);
}