// setInterval
function printNumbers(from, to) {
    let timerId = setInterval(function () {
      console.log(from);
      if (from === to) {
        clearInterval(timerId);
      }
      from += 1;
    }, 1000);
  }
  
  printNumbers(1, 5);
  