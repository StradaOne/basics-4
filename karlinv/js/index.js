'use strict';
function add(num) {
	return num.a + num.b;
}
function subtract(num) {
	return num.a - num.b;
}
function multiply(num) {
	return num.a * num.b;
}
function divide(num) {
	if (!num.b) {
		throw new Error('Деление на ноль не допускается.');
	}
	return num.a / num.b;
}
function calc(a, operation, b) {
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
