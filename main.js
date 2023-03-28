
function calc(a, b, operation) { 
	switch (operation) {
        case 'add':
            return a + b;
        case 'multi':
            return a * b;
        case 'subtract':
            return a - b;
    } 
}
console.log(calc(5,2,'add')); // 7
console.log(calc(6,7,'multi')); // 42
console.log(calc(6,2,'subtract')); // 4
