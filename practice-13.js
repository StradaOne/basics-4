function calc(operation, a, b) {
    switch (operation) {
        case 'add':
            return a + b;
        case 'multi' :
            return a * b;
        case 'subtract':
            return a - b;
        default: console.log('Нет операций');
        
    }
}
console.log(calc('add', 1, 2));
console.log(calc('multi', 1, 2));
console.log(calc('subtract', 3, 2));
console.log(calc('asdt', 4, 1)); 
