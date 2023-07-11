"use strict";
function sum(num1, num2) {
    return num1 + num2;
}
function checkPalindrome(str) {
    return str == str.split('').reverse().join('');
}
function generateRandomNumber(num1 = 0, num2 = 1) {
    return (Math.random() * (num2 - num1)) + num1;
}
function convertTemperature(temp, from, to) {
    if (from === 'C' && to === 'K') {
        return temp + 273.15;
    }
    if (from === 'C' && to === 'F') {
        return (temp * 9 / 5) + 32;
    }
    if (from === 'K' && to === 'C') {
        return temp - 273.15;
    }
    if (from === 'F' && to === 'C') {
        return (temp - 32) * 5 / 9;
    }
    if (from === 'F' && to === 'K') {
        return (temp + 459.67) * 5 / 9;
    }
    if (from === 'K' && to === 'F') {
        return (temp * 9.5) - 459.67;
    }
    return 0;
}
function reverseString(str) {
    return str.split('').reverse().join('');
}
function findMaximum(arr) {
    let max = arr[0];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > max)
            max = arr[i];
    }
    ;
    return max;
}
function calculateFactorial(num) {
    if (num === 0 || num === 1) {
        return 1;
    }
    let factorial = 1;
    for (let i = 2; i <= num; i++) {
        factorial *= i;
    }
    return factorial;
}
function calculateBMI(weigth, height) {
    return weigth / (height ** 2);
}
