function showVerticalMessage(str) {
  let result = "";
  let newStr = str.slice(0, 7);

  if (newStr[0] === "s") {
    result += "S" + "\n";
    newStr = newStr.slice(1, 7);
  }

  for (let i = 0; i < newStr.length; i++) {
    result += newStr[i] + "\n";
  }
  return result;
}

console.log(showVerticalMessage("strada"));