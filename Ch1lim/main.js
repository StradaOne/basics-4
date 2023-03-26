const error = "Ошибка";

function calc(operator, valueFirst, valueSecond) {
    if (typeof(valueFirst) !== "number" || typeof(valueSecond) !== "number"  ) {
        return error;
    }
    
    switch (operator) {
        case 'add':
            return +valueFirst + +valueSecond;
            
        case 'multi':
            return +valueFirst * +valueSecond;
            
        case 'subtract':
            return +valueFirst - +valueSecond;
        default:
            return error;
    }
}
console.log(calc("multi", 1, 2));