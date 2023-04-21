const firstNum = document.getElementById('numb1');
const secondNum = document.getElementById('numb2');
const select = document.getElementById('select');
const equal = document.getElementById('resultButton');
const result = document.getElementById('result');
const history = document.getElementById('history');
const added = document.querySelector('.added');

const OPERATIONS = {
    sum: '+',
    minus: '-',
    mult: '*',
    del: '/',
}

function sum(a,b){
    return a+b
}

function minus(a,b){
    return a-b
}

function mult(a,b){
    return a*b
}

function del(a,b){
    return a/b
}

function calc(a,b,operation) {
    let give = null;
    switch (operation) {
        case OPERATIONS.sum:
            give = sum(a,b);
            break;
        case OPERATIONS.minus:
            give = minus(a,b);
            break;
        case OPERATIONS.mult:
            give = mult(a,b);
            break;
        case OPERATIONS.del:
            give = del(a,b);  
            break;
        default:
            break;
    }
    return give;
}

equal.addEventListener('click', function(){
    const a = Number(firstNum.value);
    const b = Number(secondNum.value);
    const operation = select.value;
    const give = calc(a,b,operation);
    result.innerHTML = give;
		const newDiv = document.createElement('div');
		newDiv.classList.add('added');
		newDiv.textContent = give;
		history.appendChild(newDiv);
})

history.addEventListener('click', function(event) {
	if (event.target.classList.contains('added')) {
			event.stopPropagation();
			event.target.remove();
	}
})