function sum(num1: number, num2: number): number{
  return num1 + num2;
}

function checkPalindrome(str: string): boolean {
  return str == str.split('').reverse().join('');
}

function generateRandomNumber(num1: number = 0, num2: number = 1): number {
  return (Math.random() * (num2 - num1)) + num1;
}

function convertTemperature(temp: number, from: string, to: string): number{
  if (from === 'C' && to === 'K') {
    return temp + 273.15;
  }
  if (from === 'C' && to === 'F') {
    return (temp * 9/5) + 32;
  }
  if (from === 'K' && to === 'C') {
    return temp - 273.15;
  }
  if (from === 'F' && to === 'C') {
    return (temp - 32) * 5/9;
  }
  if (from === 'F' && to === 'K') {
    return (temp + 459.67) * 5/9;
  }
  if (from === 'K' && to === 'F') {
    return (temp * 9.5) - 459.67;
  }
  return 0;
}

function reverseString(str: string): string {
  return str.split('').reverse().join('');
}

function findMaximum(arr: number[]): number {
  let max: number = arr[0];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > max) max = arr[i];
  };
  return max;
}

function calculateFactorial(num: number): number {
  if (num === 0 || num === 1) {
    return 1;
  }

  let factorial = 1;
  for (let i = 2; i <= num; i++) {
    factorial *= i;
  }

  return factorial;
}

function calculateBMI(weigth: number, height: number): number {
  return weigth/(height**2)
} 

