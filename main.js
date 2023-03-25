"use strict";
// Calculator via if blocks

const calc = function (operation, a, b) {
  if (operation === `add`) {
    return a + b;
  } else if (operation === `substract`) {
    return a - b;
  } else if (operation === `multiply`) {
    return a * b;
  } else {
    return `Invalid input`;
  }
};

//Tests

console.log(calc(`add`, 1, 2));
console.log(calc(`multiply`, 6, 2));
console.log(calc(`substract`, 10, 2));
console.log(calc(`divide`, 10, 2));

// Calculator via switch

const calculator = function (operation, a, b) {
  switch (operation) {
    case `add`:
      return a + b;
      break;
    case `substract`:
      return a - b;
      break;
    case `multiply`:
      return a * b;
      break;
    default:
      return `Invalid input`;
  }
};

//Tests

console.log(calculator(`add`, 1, 2));
console.log(calculator(`multiply`, 6, 2));
console.log(calculator(`substract`, 10, 2));
console.log(calculator(`divide`, 10, 2));

// Codewars practice
const input = [
  [67, 8],
  [51, 18],
  [82, 7],
];

function openOrSenior(data) {
  const arr = [];

  for (let i = 0; i < data.length; i++) {
    const [a, b] = data[i];

    a > 55 && b > 7 ? arr.push(`Senior`) : arr.push(`Open`);
  }

  return arr;
}

console.log(openOrSenior(input));

// output = ["Open", "Open", "Senior", "Open", "Open", "Senior"]

function isTriangle(a, b, c) {
  return a + b > c && a + c > b && b + c > a;
}

console.log(isTriangle(3, 5, 9));
Footer
© 2023 GitHub, Inc.
Footer navigation
Terms
Privacy
Security
Status
Docs
Contact GitHub
Pricing
API
Training
Blog
About
