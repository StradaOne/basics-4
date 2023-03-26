function calc(operation, a, b) {
	a = Number(a);
	b = Number(b);

	if (isNaN(a) || isNaN(b)) {
		return "Enter a number"
	} else switch (operation) {
		case "add" :
			return a + b;
		case "multi" :
			return a *  b;
		case "subtract" :
			return a - b;
		default:
			return "Error"
	}
}

console.log(calc("add", 6, 0.25))
console.log(calc("multi", 8, "7"))
console.log(calc("subtract", 1000, 7))
console.log(calc("add", null, 7))
console.log(calc("add", undefined, 7))
console.log(calc("multi", false, 7))