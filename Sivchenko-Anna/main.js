function printNumbers(from, to) {
  let count = from;

  setTimeout(function start() {
    console.log(count);
    if (count < to) {
      setTimeout(start, 1000)
    }
    count++;
  }, 1000)
}

printNumbers(2, 7);

function printNumbers2(from, to) {
  let count = from;

  let timerId = setInterval( function start() {
    console.log(count);
    if (count === to) {
      clearInterval(timerId);
    }
    count ++;
  }, 1000);
}

printNumbers2(1, 4);