function first(callback) {
  console.log("First function");
  callback();
}

function second(num1, num2) {
  console.log(num1 * num2);
}

first(() => {
  second(7, 8);
});
