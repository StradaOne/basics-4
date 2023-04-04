const maxLength = 7;
const firstLetter = "s";

function showVerticalMessage(str) {
  if (str[0] === firstLetter) {
    str = str[0].toUpperCase() + str.slice(1);
  }
  if (str.length > maxLength) {
    str = str.slice(0, 7);
  }
  for (let char of str) {
    console.log(char);
  }
}

showVerticalMessage("stradaqwertyuio");
