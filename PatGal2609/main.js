function calc(oper, a, b) {
    if (typeof a === 'number' && typeof a !== NaN && typeof a !== Infinity){
        if (typeof b === 'number' && typeof b !== NaN && typeof b !== Infinity){
            if (oper === 'add') {
                return a + b;
            } else if (oper === 'multi') {
                return a * b;
            } else if (oper === 'substract') {
                return a - b;
            } else if(oper === '' || oper === null) {
                 return ('Ввидите правильный оператор');
            } else {
                    return ('Error');
            }
        } else {
            return ('Вы ввели не верные оператор или оперант');
        }
    } else {
        return ('Вы ввели не верный оперант')
    }
}

function calcs(opers, c, d) {
    if (typeof opers !== 'string' || typeof c !== 'number' || typeof d !== 'number' || c === NaN || d === NaN || c === Infinity || d === Infinity){
        return ('Вы ввели не верный оперант');
      }
    switch (opers) {
        case 'add':
            return c + d;
            break;
        case 'multi':
            return c * d;
            break
        case 'substract':
            return c - d;
            break
        default:
            return ('Вы ввели не верные оператор или оперант');
            break;
    }
}
