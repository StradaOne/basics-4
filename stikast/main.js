const a = document.querySelector('.operand_a');
const b = document.querySelector('.operand_b');
const operation = document.querySelector('.operation')
const buttonResult = document.querySelector('.button');
const resultOutput = document.querySelector('.result')

buttonResult.addEventListener('click', rendering)

function getValueA() {
	return a.value
}

function getValueB() {
	return b.value
}

function isNumber(value) {
	if (value === "") {
		alert ("Error! Enter a number!")
		return false
	} else {
		return true
	}
}

function getOperationValue() {
	return operation.value
}

function calculation() {
	let operationValue = getOperationValue();
	let result;

	if (isNumber(getValueA()) && isNumber(getValueB())) {

		switch(operationValue) {
			case '+':
				result = +getValueA() + +getValueB();
				break;
			case '-':
				result = +getValueA() - +getValueB();
				break;
			case '*':
				result = +getValueA() * +getValueB();
				break;
			case '/':
				result = +getValueA() / +getValueB();
				break;
			default:
				 result = false;
		}
	
		return +result.toFixed(5);
	}
}

function rendering() {
	return resultOutput.textContent = calculation()
}