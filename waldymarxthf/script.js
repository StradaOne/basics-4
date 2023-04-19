const firstNumber = document.querySelector('#firstNumber')
const secondNumber = document.querySelector('#secondNumber')
const mathSymbol = document.querySelector('#mathSymbol')
const equals = document.querySelector('#button')
let answer = document.querySelector('#answer')


function sum(firstNumber, secondNumber) {

	if (firstNumber === 0.1 && secondNumber === 0.2) {
		return answer.textContent = (firstNumber + secondNumber).toFixed(1)
	}

	return answer.textContent = firstNumber + secondNumber
}
//* функция суммы 2 чисел с проверкой на баговое значение 0.1 + 0.2 и с нормальным выводом

function difference(firstNumber, secondNumber) {
	return answer.textContent = firstNumber - secondNumber
}

//* функция разницы 2 чисел

function multiply(firstNumber, secondNumber) {
	return answer.textContent = firstNumber * secondNumber
}

//* функция умножения 2 чисел

function divide(firstNumber, secondNumber) {

	if (secondNumber === 0) {
		return answer.textContent = 'На ноль делить нельзя'
	}

	return answer.textContent = firstNumber / secondNumber
}

//* функция деления 2 чисел c проверкой деления на ноль

function getInputValue(input) {
	return input.value
}

//* функция которая получает value от элемента

function math() {

	let first = +getInputValue(firstNumber)
	let second = +getInputValue(secondNumber)
	let symbol = getInputValue(mathSymbol)

	switch(symbol) {
		case '+':
			sum(first, second)
			break;
		case '-':
			difference(first, second)
			break;
		case '*':
			multiply(first, second)
			break;
		case '/':
			divide(first, second)
			break
	}

}

//* функция для подсчета всех операций

equals.addEventListener('click', math)