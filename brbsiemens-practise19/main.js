let num = +prompt("Enter a number", '12');

// вернёт true всегда, кроме ситуаций, когда аргумент - Infinity/-Infinity или не число
console.log( isFinite(num) );