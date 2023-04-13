// Напишите функцию printNumbers(from, to), которая выводит число каждую секунду, начиная от from и заканчивая to.

// Сделайте два варианта решения.
let countStart = 0
let countEnd = 5


// Используя setInterval.
function printNumbers(from, to) {
  from = ++countStart
  to = countEnd
  let timerId = setInterval(printNumbers, 1000, 0, 5)
  console.log(countStart)
  if (from === to) {
    clearInterval(timerId)
  }
}

// Используя рекурсивный setTimeout.
setTimeout(function printNumbers(from, to) {
  from = ++countStart
  to = countEnd
  console.log(countStart)
  let timerId = setTimeout(printNumbers, 1000)
  if (from === to) {
    clearTimeout(timerId)
  }
},1000)


