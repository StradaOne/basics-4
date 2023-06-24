const UnknownOperationError = "unknown operation";

function calc(a, b, operation) {
    if (operation === "add") {
        return a + b;
    }
    if (operation === "multi") {
        return a * b;
    }
    if (operation === "subtract") {
        return a - b;
    }
    return UnknownOperationError;
}

console.log(calc(1, 2, "multi"));
// console.log(calc(1, 2, "multi"));
// console.log(calc(3, 2, "subtract"));
