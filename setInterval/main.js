
function printNumbers1(from, to){
    let count = 0;
    const intervalId = setInterval(() => {
        if(count >= from && count <= to){
            console.log(count);
        }
        if(count > to){
            clearInterval(intervalId)
            return;
        }
        ++count;
        console.log(count)
    }, 1000)
}

printNumbers1(5, 9)


function printNumbers2(from, to){
    let count = 0;
    let timeOutId = setTimeout(function print(){
        if(count >= from && count <= to){
            console.log(count);
        }
        if(count > to){
            clearTimeout(timeOutId)
            return;
        }
        ++count;
        timeOutId = setTimeout(print, 1000);
    }, 1000);
}

printNumbers2(4, 8)




// Используя рекурсивный setTimeout.