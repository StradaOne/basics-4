//Через if

function calc(operation, a, b) {
    if (operation === 'add') {
        return a + b;
    } else if (operation === 'substract') {
        return a - b;
    } else if (operation === 'multi') {
        return a * b;
    } else {
        console.log("entre une operaration");
    }
}
console.log(calc('add', 2, 3));

// Через switch

function calcs(oper, c, d) {
    switch (oper) {
        case 'add':
            alert(c + d);
            break;
        case 'multi':
            alert(a * b);
            break
        case 'substract':
            alert(a - b);
            break
        default:
            alert('entre une operaration')
            break;
    }
}