function calc(a, b, operation ) {
    switch(operation) {
        case 'add':
            return (a + b)
            break;
        case 'multi':
            return (a * b)
            break;
        case 'subsr':
            return (a - b)
    }
}

console.log(calc(6, 7, 'multi'));


