
function calc(a, b, operation) { 
    if (!isNaN(a) && !isNaN(b)) {
        switch(operation) {
            case 'add':
                return a+b;
            case 'multi':
                return a*b;
            case 'subtract':
                return a-b;
        };
    } else {
        return ('Enter a number');
    }
    
};



console.log(calc(2, 1, 'add'));
console.log(calc(2, 1, 'multi'));
console.log(calc(2, 1, 'subtract'));
