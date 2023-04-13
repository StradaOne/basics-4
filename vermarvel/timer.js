// via setTimeout
const printNumbers = function (from, to) {
  setTimeout(function log() {
    if (from <= to) {
      console.log(from++);
      setTimeout(log, 1000);
    }
  }, 1000);
};

//printNumbers(1, 8);

// via setInterval
const printNumbers2 = function (from, to) {
  let timerId = setInterval(function log() {
    if (from <= to) {
      console.log(from++);
    }
  }, 1000);
  from > to ? clearInterval(timerId) : ``;
};

//printNumbers2(1, 12);
