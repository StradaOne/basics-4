function calc(operation, a, b) {
        switch (operation) {
            case "add":
                return a + b;
            case "multi":
                return a * b;
            case "subtract":
                return a - b;
            default:
                return "Error";
        }
}
console.log(calc("add", 2, 3));
console.log(calc("multi", 3, 5));
console.log(calc("subtract", 7, 4));