// #31 Таймеры и Интервалы
function printNumbers(from, to) {
    let timerId = setInterval(() => {
        console.log(from);
        if (from === to) {
            clearInterval(timerId);
        }
        from++;
    }, 1000)
}

printNumbers(5, 10);

// =====================================================================

function printNumbers(from, to) {
    setTimeout(function go() {
        console.log(from);
        if (from < to) {
            setTimeout(go, 1000)
        }
        from++;
    }, 1000)
}

printNumbers(5, 10);

