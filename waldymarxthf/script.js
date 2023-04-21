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

const history = [];

function saveAnswer(first, second, symbol, result) {
	const answerBlock = document.querySelector('.answer-block');
	const lastOperation = history[history.length - 1];

	if (
		lastOperation &&
		lastOperation.first === first &&
		lastOperation.second === second &&
		lastOperation.symbol === symbol
	) {
		return;
	}

	const newDiv = document.createElement('div');
	newDiv.innerHTML = `
		<span class="first-value">${first}</span>
		<span class="operation">${symbol}</span>
		<span class="second-value">${second}</span>
		<span class="equals">=</span>
		<span class="result">${result}</span>
	`;
	newDiv.classList.add('answer');
	answerBlock.insertAdjacentElement('beforeend', newDiv);
	newDiv.addEventListener('click', () => {
		newDiv.remove();
	});

	history.push({
		first,
		second,
		symbol,
		result,
	});
}

//* функция которая сохраняет ответы и удаляет при нажатии на них

equals.addEventListener('click', () => {
	const first = +getInputValue(firstNumber);
	const second = +getInputValue(secondNumber);
	const symbol = getInputValue(mathSymbol);
	let result;

	switch (symbol) {
		case '+':
			result = sum(first, second);
			break;
		case '-':
			result = difference(first, second);
			break;
		case '*':
			result = multiply(first, second);
			break;
		case '/':
			result = divide(first, second);
			break;
	}

	saveAnswer(first, second, symbol, result);
});

//* подсчет всех операций