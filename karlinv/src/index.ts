interface Numbers {
	a: number;
	b: number;
}

function add(num: Numbers): number {
	return num.a + num.b;
}

function subtract(num: Numbers): number {
	return num.a - num.b;
}

function multiply(num: Numbers): number {
	return num.a * num.b;
}

function divide(num: Numbers): number {
	if (!num.b) {
		throw new Error('Деление на ноль не допускается.');
	}
	return num.a / num.b;
}

function calc(a: number, operation: string, b: number): number {
	switch (operation) {
		case '+':
			return add({ a: a, b: b });

		case '-':
			return subtract({ a: a, b: b });

		case '*':
			return multiply({ a: a, b: b });

		case '/':
			return divide({ a: a, b: b });

		default:
			throw new Error(`Не верное значение${operation}, используйте [+, -, *, /]`);
	}
}
