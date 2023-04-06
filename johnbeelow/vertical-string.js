function showVerticalMessage(inputString) {
  let str;

  if (inputString[0] === "s") {
    str = inputString[0].toUpperCase() + inputString.slice(1, 6);
  } else {
    str = inputString.slice(0, 6);
  }

  for (let char of str) {
    console.log(char);
  }
}


showVerticalMessage("strada");

// showVerticalMessage("stradaaaaa");
// showVerticalMessage("bootlegger");

