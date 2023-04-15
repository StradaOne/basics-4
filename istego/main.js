// Желаемый результат заключается в том, что при выполнении всех функций в массиве должно быть возвращено число от 0 до N.
function buildFun(n) {
    let res = [];

    for (let i = 0; i < n; i++) {
        res.push(function () {
            return i;
        });
    }
    return res;
}

// Проверка
for (let i = 0; i < 10; i++) {
    console.log(buildFun(10)[i]());
}


const arrNumbers = [4, 3, 5, 2, 3, 5, 4, 3, 3, 5, 2, 5];

console.log(getAverage(arrNumbers));

function getAverage(marks) {
    const quantity = marks.length;
    let sumNambers = null;
    let result = null;

    marks.forEach(number => {
        sumNambers += number;
    })

    result = Math.floor(sumNambers / quantity);
    return result;
}