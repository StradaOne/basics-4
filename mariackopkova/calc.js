//создаю функцию

function calc(operation, a, b) {
  if (operation === "multi") {
    return a * b
  } else if (operation === "add") {
    return a + b
  } else if (operation === "subtract") {
    return a - b
  } else {
    return null
  }
}
console.log(calc("multi", 1, 2))
