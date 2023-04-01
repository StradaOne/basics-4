function cals(a, b, operation) {
    switch (operation) {
        case "add":
            return a + b;
        case "multi":
            return a * b;
        case "subtract":
            return a - b;
    }

}
let x = cals(1, 2, "add");
console.log(x);
let y = cals(1, 2, "multi");
console.log(y);
let z = cals(1, 2, "subtract");
console.log(z);
