const error = "please enter number"
function calc(num1, num2, operation) {
    if(isFinite(num1) && isFinite(num2)) {
    switch (operation) {
    case 'add':
        return num1 + num2;
    case 'multi':
        return num1 * num2;
    case 'subtract':
        return num1 - num2;
    } 
    } else {
        return error
    }
}

console.log(calc(NaN, false, 'add'))
console.log(calc(24, NaN, 'multi'))
console.log(calc(24, 12, 'subtract'))