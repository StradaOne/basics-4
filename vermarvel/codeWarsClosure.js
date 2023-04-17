"use strict";
//#34 Практика Code Wars

// Задача на замыкание

// вариант где за счет let каждая функция получает итеративное i вместо финальной равной n

function buildFun(n) {
  const res = [];

  for (let i = 0; i < n; i++) {
    res.push(function () {
      return i;
    });
  }
  return res;
}

// вариант с var где функция высшего порядка порождает искомую функцию в итерации во время отправки в массив: замыкая т.о. видимость i на его итеративном значении

function buildFun(n) {
  var res = [];

  function higherOrderFunc(i) {
    return function () {
      return i;
    };
  }

  for (var i = 0; i < n; i++) {
    res.push(higherOrderFunc(i));
  }
  return res;
}

// вариант с var, где обеспечить итеративное значение i нам помогает функция принимающая аргументом i и возвращающая его же, замыкающая значение i в скоупе итерации во время объявления переменной до отправки в массив

function buildFun(n) {
  var res = [];

  function createFunc(i) {
    return i;
  }
  for (var i = 0; i < n; i++) {
    var func = createFunc(i);
    res.push(func);
  }
  return res;
}
// 2я задача Get the mean of an array

function getAverage(marks) {
  const sum = marks.reduce((a, b) => a + b);
  return sum / marks.length;
}
