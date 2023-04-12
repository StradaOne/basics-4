// function printNumbers(from, to) {
//     let currentNum = from;
//     let timerId = setInterval(() => {
//         console.log(currentNum);
//         if (currentNum === to) {
//             clearInterval(timerId);
//         }
//         currentNum++;
//     }, 1000);
// }


function printNumbers(from, to) {
    let currentNum = from;
    let timerId = setTimeout(function count() {
        console.log(currentNum);
        currentNum++;
        if (currentNum <= to) {
            timerId = setTimeout(count, 1000);
        }
        
    }, 1000);
}
printNumbers(5, 10);