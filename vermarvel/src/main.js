"use strict";
// Practice
function add(integer1, integer2) {
    return integer1 + integer2;
}
function toLower(phrase) {
    return phrase.toLowerCase();
}
function getArrLength(arr) {
    return arr.length;
}
function hasNonLatinChars(str) {
    return !str.match(/[a-z]/i);
}
const string = "Soy Sauce!";
const string1 = "Soy Sauce!ЩЮЩ";
let check = hasNonLatinChars(string);
check = hasNonLatinChars(string1);
function firstElementType(arr) {
    return typeof arr.at(0);
}
function getMax(arr) {
    return Math.max(...arr);
}
function getConcat(left, right) {
    return left.concat(right);
}
function sortArrLessToMore(arr) {
    return arr.sort((numA, numB) => numA - numB);
}
function isSquare(sideA, sideB) {
    if (sideA === sideB) {
        return true;
    }
    else {
        return false;
    }
}
function equalLength(arr1, arr2) {
    if (arr1.length === arr2.length) {
        return true;
    }
    else {
        return false;
    }
}
