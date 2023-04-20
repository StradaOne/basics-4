const result = document.getElementById('res')

function calculated(num1, num2, operation) {
    switch (operation) {
    case 'add':
        return num1 + num2
    case 'multi':
        return num1 * num2
    case 'subtract':
        return num1 - num2
    case 'division':
        return num1 / num2
    } 
}
function getResult () {
    const num1 = document.getElementById('num1').value,
    num2 = document.getElementById('num2').value,
    select = document.getElementById('tog').value
    document.getElementById('ans').textContent = calculated(+num1, +num2, select)
}

result.addEventListener('click', getResult)
