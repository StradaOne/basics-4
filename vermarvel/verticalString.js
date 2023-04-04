"use strict";

const showVerticalMessage = function (str) {
  let word = str.toLowerCase();
  word.length > 7 ? (word = word.slice(0, 7)) : "";
  if (word[0] === "s") {
    word = word[0].toUpperCase() + word.slice(1);
  }
  let result = word.replaceAll("", `\n`).trim();
  console.log(result);

  return result;
};

const string = "subsequence";
showVerticalMessage(string);
