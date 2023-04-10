function showVerticalMessage(str) {
  if (str[0] === "s") {
    str = str[0].toUpperCase() + str.slice(1, 7);
  } else if (str.length > 7) {
    str = str.slice(0, 7);
  }
  let strVertical = "";
  for (let char of str) {
    strVertical += char + "\n";
  }
  console.log(strVertical);
}

showVerticalMessage(`stradaa`);
showVerticalMessage(`Stradaaaaaaaa`);
