const ADD = 'add'
const MULTI = 'multi'
const SUBTRACT = 'subtract'
const ERROR = 'its not a number'

function checkNumber(a) {
	return isNaN(a)
}


function calc(operation, a, b) {
	if(checkNumber(a) || checkNumber(b)) {
		return ERROR
	}

	switch (operation) {
		case ADD:
			return a + b
		case MULTI:
			return a * b
		case SUBTRACT:
			return a - b
		default:
			console.log('omg where is your eyes')
			return null
	}
}

console.log(calc('add', 1, 2))
console.log(calc('add', 1, NaN))
