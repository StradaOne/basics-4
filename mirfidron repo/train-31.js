// --- ex 1 --- //

function printNumbers(from, to) {count = from;
  
    let timerId = setInterval(function() {
      console.log(count);
      if (count == to) {
        clearInterval(timerId);
      }
      count++;
    }, 1000);
  }
  
  printNumbers(2, 8);

function printNumbers(from, to) {
    let count = from;

    setTimeout(function next() {
    console.log(count);
    if (count < to) {
        setTimeout(next, 1000);
    }
    count++;
    }, 1000);
}

printNumbers(2, 8);
    