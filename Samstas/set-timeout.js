// setTimeout
function printNumbers(from, to) {
    setTimeout(function go() {
      alert(from);
      if (from < to) {
        setTimeout(go, 1000);
      }
      from += 1;
    }, 1000);
  }
  
  printNumbers(1, 5);