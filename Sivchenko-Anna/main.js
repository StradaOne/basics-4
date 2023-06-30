// Understanding closures - the basics

function buildFun(n) {
  const result = [];

  for (let i = 0; i < n; i++) {
    result.push(() => i)
  }
  return result;
}

// Get the mean of an array

function getAverage(marks) {
  const amountOfMarks = marks.length;
  const sumOfMarks = marks.reduce((sum, current) => sum + current, 0);
  const result = Math.floor(sumOfMarks / amountOfMarks);

  return result;
}

console.log(getAverage([2, 2, 2, 2]));