// Practice

function add(integer1: number, integer2: number): number {
  return integer1 + integer2;
}

function toLower(phrase: string): string {
  return phrase.toLowerCase();
}

function getArrLength(arr: number[]): number {
  return arr.length;
}

function hasNonLatinChars(str: string): boolean {
  return !str.match(/[a-z]/i);
}

const string = "Soy Sauce!";
const string1 = "Soy Sauce!ЩЮЩ";
let check: boolean = hasNonLatinChars(string);
check = hasNonLatinChars(string1);

function firstElementType(arr: any): any {
  return typeof arr.at(0);
}

function getMax(arr: number[]): number {
  return Math.max(...arr);
}

function getConcat(left: string[], right: string[]): string[] {
  return left.concat(right);
}

function sortArrLessToMore(arr: number[]): number[] {
  return arr.sort((numA, numB) => numA - numB);
}

function isSquare(sideA: number, sideB: number): boolean {
  if (sideA === sideB) {
    return true;
  } else {
    return false;
  }
}

function equalLength(arr1: any[], arr2: any[]): boolean {
  if (arr1.length === arr2.length) {
    return true;
  } else {
    return false;
  }
}
